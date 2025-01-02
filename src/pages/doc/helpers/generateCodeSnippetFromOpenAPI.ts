import { OpenApiJson, OpenApiPathMethod } from "@/types";

type SnippetParams = {
  openAPIJson: OpenApiJson | null,
  language: string,
  method: string,
  path: string,
}

function generateCurlSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const headerString = Object.entries(headers)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(" \\\n  ");
  const bodyString = body ? `-d '${JSON.stringify(body)}'` : "";

  return `
    curl -X ${method.toUpperCase()} \\
      ${headerString} \\
      ${bodyString} \\
      "${url}"
    `.trim();
}

function generatePythonSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const headerString = Object.entries(headers)
    .map(([key, value]) => `'${key}': '${value}'`)
    .join(",\n  ");
  const bodyString = body ? `, json=${JSON.stringify(body)}` : "";

  return `
    import requests
    headers = {
      ${headerString}
    }
    response = requests.${method.toLowerCase()}('${url}'${bodyString}, headers=headers)
    print(response.json())
    `.trim();
}

function generateNodeSnippet(method: string, url: string, headers: Record<string, string>, body: unknown) {
  const headerString = Object.entries(headers)
    .map(([key, value]) => `'${key}': '${value}'`)
    .join(",\n  ");
  const bodyString = body ? `, ${JSON.stringify(body)}` : "";

  return `
    const axios = require('axios');
    const headers = {
      ${headerString}
    };
    axios.${method.toLowerCase()}('${url}'${bodyString}, { headers })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    `.trim();
}

const snippets = new Map<string, (method: string, url: string, headers: Record<string, string>, body: unknown) => string>();

snippets.set("curl", generateCurlSnippet);
snippets.set("python", generatePythonSnippet);
snippets.set("node", generateNodeSnippet);


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
