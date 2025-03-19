import { OpenApiJson, OpenApiPathMethod } from "@/types";

type SnippetParams = {
  openAPIJson: OpenApiJson | null,
  language: string,
  method: string,
  path: string,
}

function generateCurlSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const headerString = Object.keys(headers).length > 0 
    ? Object.entries(headers)
        .map(([key, value]) => `-H "${key}: ${value}"`)
        .join(" \\\n  ") + " \\"
    : "";
  
  const bodyString = body ? `-d '${JSON.stringify(body)}' \\` : "";

  // Create parts array with only non-empty strings
  const parts = ["curl -X " + method.toUpperCase()];
  
  if (headerString) {
    parts.push(headerString);
  }
  
  if (bodyString) {
    parts.push(bodyString);
  }
  
  parts.push(`"${url}"`);
  
  // Join parts with proper line continuation
  return parts.join(" \\\n  ");
}

function generatePythonSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const hasHeaders = Object.keys(headers).length > 0;
  const headerString = hasHeaders
    ? Object.entries(headers)
        .map(([key, value]) => `'${key}': '${value}'`)
        .join(",\n  ")
    : "";
  
  const bodyString = body ? `json=${JSON.stringify(body)}` : "";
  
  // Construct the request line based on what parameters we have
  let requestLine = `response = requests.${method.toLowerCase()}('${url}'`;
  if (body) requestLine += `, ${bodyString}`;
  if (hasHeaders) requestLine += `, headers=headers`;
  requestLine += ")";

  // Create parts array with only necessary components
  const parts = ["import requests"];
  
  if (hasHeaders) {
    parts.push(`headers = {\n  ${headerString}\n}`);
  }
  
  parts.push(requestLine);
  parts.push("print(response.json())");
  
  // Join parts with proper line breaks
  return parts.join("\n");
}

function generateNodeSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const hasHeaders = Object.keys(headers).length > 0;
  const headerString = hasHeaders
    ? Object.entries(headers)
        .map(([key, value]) => `'${key}': '${value}'`)
        .join(",\n  ")
    : "";
  
  const bodyString = body ? `${JSON.stringify(body)}` : "";
  
  // Construct the request line and options based on what parameters we have
  let requestLine = `axios.${method.toLowerCase()}('${url}'`;
  const options = [];
  
  if (body) {
    requestLine += `, ${bodyString}`;
  }
  
  if (hasHeaders) {
    options.push("headers");
  }
  
  if (options.length > 0) {
    requestLine += `, { ${options.join(", ")} }`;
  }
  
  requestLine += ")";

  // Create parts array with only necessary components
  const parts = ["const axios = require('axios');"];
  
  if (hasHeaders) {
    parts.push(`const headers = {\n  ${headerString}\n};`);
  }
  
  parts.push(`${requestLine}\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`);
  
  // Join parts with proper line breaks
  return parts.join("\n");
}

function generateCSharpSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const hasHeaders = Object.keys(headers).length > 0;
  const headerString = hasHeaders
    ? Object.entries(headers)
        .map(([key, value]) => `request.Headers.Add("${key}", "${value}");`)
        .join("\n    ")
    : "";
  
  const bodyString = body 
    ? `var content = new StringContent(
    JsonConvert.SerializeObject(${JSON.stringify(body)}),
    Encoding.UTF8, 
    "application/json");
    request.Content = content;`
    : "";

  // Create parts array for the request setup
  const requestParts = [];
  
  requestParts.push(`var request = new HttpRequestMessage(HttpMethod.${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}, "${url}");`);
  
  if (headerString) {
    requestParts.push(headerString);
  }
  
  if (bodyString) {
    requestParts.push(bodyString);
  }

  return `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
  static async Task Main()
  {
    using (var client = new HttpClient())
    {
      ${requestParts.join("\n      ")}

      var response = await client.SendAsync(request);
      response.EnsureSuccessStatusCode();
      
      var responseBody = await response.Content.ReadAsStringAsync();
      Console.WriteLine(responseBody);
    }
  }
}`;
}

const snippets = new Map<string, (method: string, url: string, headers: Record<string, string>, body: unknown) => string>();

snippets.set("curl", generateCurlSnippet);
snippets.set("python", generatePythonSnippet);
snippets.set("node", generateNodeSnippet);
snippets.set("csharp", generateCSharpSnippet);

export default function generateCodeSnippetFromOpenAPI({
  openAPIJson,
  language,
  method,
  path
}: SnippetParams): string {
  if (!openAPIJson || !path || !method) {
    return "";
  }
  const baseUrl = buildBaseUrl(openAPIJson);
  const endpoint = getEndpoint(openAPIJson, path, method);
  validateEndpoint(endpoint, method, path);
  const headers: Record<string, string> = {};
  const queryParams: string[] = [];
  let body = null;

  buildQueryAndHeaders(endpoint, headers, queryParams);
  body = buildRequestBody(endpoint, body, headers);
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
  const fullUrl = `${baseUrl}${path}${queryString}`;
  return snippets.get(language)?.(method, fullUrl, headers, body) || "";
}

function validateEndpoint(endpoint: OpenApiPathMethod, method: string, path: string) {
  if (!endpoint) {
    throw new Error(`Endpoint ${method.toUpperCase()} ${path} não encontrado`);
  }
}

function getEndpoint(openAPIJson: OpenApiJson, path: string, method: string) {
  return openAPIJson.paths?.[path]?.[method.toLowerCase()];
}

function buildBaseUrl(openAPIJson: OpenApiJson) {
  return openAPIJson.servers?.[0]?.url || "";
}

function buildQueryAndHeaders(endpoint: OpenApiPathMethod, headers: Record<string, string>, queryParams: string[]) {
  if (endpoint.parameters) {
    endpoint.parameters.forEach((param) => {
      if (param.in === "header") {
        headers[param.name] = param.example || "<value>";
      } else if (param.in === "query") {
        queryParams.push(`${param.name}=${param.example || "<value>"}`);
      }
    });
  }
}

function buildRequestBody(endpoint: OpenApiPathMethod, body: unknown, headers: Record<string, string>) {
  if (endpoint.requestBody) {
    const content = endpoint.requestBody.content;
    const mediaType = Object.keys(content)[0];

    if (content[mediaType]) {
      body = content[mediaType]?.example || content[mediaType]?.schema?.default || null;
      headers["Content-Type"] = mediaType;
    }
  }
  return body;
}
