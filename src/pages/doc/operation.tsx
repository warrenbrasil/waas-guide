import { OpenApiJson, OpenApiParameter, Operation, ParsedProperty, ParsedSchema } from "@/types";
import OperationTitle from "./operation-title";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowDownToLine, ArrowUpFromLine, Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ParamGroup from "./param-group";
import { useMemo } from "react";
import PropertiesGroup from "./properties-group";
import MarkdownRenderer from "@/utils/MarkdownRenderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import generateCodeSnippetFromOpenAPI from "./helpers/generateCodeSnippetFromOpenAPI";
import { transformSecuritySchemes } from "./helpers/transformeSecuritySchemes";

interface OperationProps {
  doc: Operation | null;
  openapi: OpenApiJson | null
}

const SnippetTabsList = <TabsList className="h-12 w-full">
  <TabsTrigger value="curl" className="h-9 w-1/3">curl</TabsTrigger>
  <TabsTrigger value="python" className="h-9 w-1/3">python</TabsTrigger>
  <TabsTrigger value="node" className="h-9 w-1/3">node</TabsTrigger>
</TabsList>;

function DocSidebar(
  securityParameters: {
    name: string;
    properties: ParsedProperty[];
    type: string;
  }[],
  curlSnippet: string,
  pythonSnippet: string,
  nodeSnippet: string
) {
  return <div className="sidebar sticky top-16">
    <PropertiesGroup title="SECURITY" properties={securityParameters} />
    <Tabs defaultValue="curl" className="w-full mt-4">
      {SnippetTabsList}
      {CurlSnippetContent(curlSnippet)}
      {PythonSnippetContent(pythonSnippet)}
      {NodeSnippetContent(nodeSnippet)}
    </Tabs>
  </div>;
}

function NodeSnippetContent(nodeSnippet: string) {
  return <TabsContent value="node" className="py-4">
    <div className="rounded-md relative">
      <SyntaxHighlighter showLineNumbers wrapLines language="typescript" style={nightOwl}>
        {nodeSnippet}
      </SyntaxHighlighter>
    </div>
  </TabsContent>;
}

function PythonSnippetContent(pythonSnippet: string) {
  return <TabsContent value="python" className="py-4">
    <SyntaxHighlighter showLineNumbers wrapLines language="python" style={nightOwl}>
      {pythonSnippet}
    </SyntaxHighlighter>
  </TabsContent>;
}

function CurlSnippetContent(curlSnippet: string) {
  return <TabsContent value="curl" className="py-4">
    <SyntaxHighlighter showLineNumbers wrapLines language="typescript" style={nightOwl}>
      {curlSnippet}
    </SyntaxHighlighter>
  </TabsContent>;
}

function RequestExample(doc: Operation | null) {
  return <div className="text-sm font-mono">
    <SyntaxHighlighter showLineNumbers wrapLines language="json" style={nightOwl}>
      {JSON.stringify(doc?.requestExample, null, 2)}
    </SyntaxHighlighter>
  </div>;
}

function RequestInfo(
  headerParameters: OpenApiParameter[],
  queryParameters: OpenApiParameter[],
  pathParameters: OpenApiParameter[],
  doc: Operation | null
) {
  return <>
    <div className="flex items-center gap-4 mb-8">
      <ArrowUpFromLine />
      <h3 className="text-2xl">Informações a requisição</h3>
    </div>
    <ParamGroup title="HEADER" parameters={headerParameters} />
    <ParamGroup title="QUERY" parameters={queryParameters} />
    <ParamGroup title="PATH" parameters={pathParameters} />
    <PropertiesGroup title="BODY" properties={doc?.requestBody ?? []} />
  </>;
}

function Groups(doc: Operation | null) {
  return <div>
    <span className="text-sm font-semibold mr-4">Grupo</span>
    <Badge variant="outline">{doc?.details?.tags?.join(", ") ?? "-"}</Badge>
  </div>;
}

function Description(doc: Operation | null) {
  return <div className="my-8">
    <MarkdownRenderer markdownContent={doc?.details?.description as string} />
  </div>;
}

function PathInfo(doc: Operation | null) {
  return <Alert className={`my-4 alert alert-${doc?.method} py-8`}>
    <AlertDescription className="flex items-center">
      <Terminal className="h6 w-6 mr-4" />
      <span className={`method ${doc?.method} mr-4`}>{doc?.method}</span>
      <code>{doc?.path as string}</code>
    </AlertDescription>
  </Alert>;
}

function PythonSnippet(openapi: OpenApiJson | null, doc: Operation | null) {
  return useMemo(
    () => generateCodeSnippetFromOpenAPI({
      openAPIJson: openapi,
      path: doc?.path || "",
      method: doc?.method || "",
      language: "python"
    }),
    [openapi, doc?.path, doc?.method]);
}

function CurlSnippet(openapi: OpenApiJson | null, doc: Operation | null) {
  return useMemo(
    () => generateCodeSnippetFromOpenAPI({
      openAPIJson: openapi,
      path: doc?.path || "",
      method: doc?.method || "",
      language: "curl"
    }),
    [openapi, doc?.path, doc?.method]);
}

function NodeSnippet(openapi: OpenApiJson | null, doc: Operation | null) {
  return useMemo(
    () => generateCodeSnippetFromOpenAPI({
      openAPIJson: openapi,
      path: doc?.path || "",
      method: doc?.method || "",
      language: "node"
    }),
    [openapi, doc?.path, doc?.method]);
}

function SecurityParameters(doc: Operation | null) {
  return useMemo(() => transformSecuritySchemes(doc?.components?.securitySchemes || {}),
    [doc?.components?.securitySchemes]
  );
}

function HeaderParameters(doc: Operation | null) {
  return useMemo(
    () => [
      ...doc?.details?.parameters?.filter((parameter) => parameter.in === "header") || [],
      ...Object.entries(doc?.components?.parameters || {})
        .filter(([, parameter]) => parameter.in === "header")
        .map(([, value]) => value) || []
    ],
    [doc?.details?.parameters, doc?.components?.parameters]
  );
}

function PathParameters(doc: Operation | null) {
  return useMemo(
    () => doc?.details?.parameters?.filter((parameter) => parameter.in === "path") || [],
    [doc?.details?.parameters]
  );
}

function QueryParameters(doc: Operation | null) {
  return useMemo(
    () => doc?.details?.parameters?.filter((parameter) => parameter.in === "query") || [],
    [doc?.details?.parameters]
  );
}

function ResponsePropertiesGroup(doc: Operation | null) {
  const responseProperties = doc?.responses?.map((schema) => {
    return (
      <div key={schema.statusCode}>
        {ResponseProperty(schema)}
      </div>
    );
  });

  return (
    <>
      <div className="flex items-center gap-4 mt-8">
        <ArrowDownToLine />
        <h3 className="text-2xl">Informações da resposta</h3>
      </div>
      {responseProperties}
    </>
  )
}

function ResponseProperty(schema: ParsedSchema) {
  return <div className="mt-8">
    <div className="flex items-center gap-4">
      <Badge variant="outline" className={`status-${schema.statusCode}`}>{schema.statusCode}</Badge>
      <div className="font-semibold">{schema.statusDescription}</div>
    </div>
    <PropertiesGroup key={schema.statusCode} properties={schema.responses ?? []} />
  </div>;
}

const TabSpec = <TabsTrigger value="spec" className="w-1/2 h-9">Spec</TabsTrigger>;

function DocTabs(
  doc: Operation | null,
  headerParameters: OpenApiParameter[],
  queryParameters: OpenApiParameter[],
  pathParameters: OpenApiParameter[]
) {
  return <Tabs defaultValue="spec" className="w-full">
    {ContentTabs(doc)}
    <TabsContent value="spec" className="py-4">
      {RequestInfo(headerParameters, queryParameters, pathParameters, doc)}
      {ResponsePropertiesGroup(doc)}
    </TabsContent>
    <TabsContent value="requestSample" className="py-4">
      {RequestExample(doc)}
    </TabsContent>
  </Tabs>;
}

function DocTitle(doc: Operation | null) {
  return <OperationTitle title={doc?.details?.summary as string} />;
}

function ContentTabs(doc: Operation | null) {
  return <TabsList className="h-12 w-full justify-start">
    {TabSpec}
    {TabRequestExample(doc)}
  </TabsList>;
}

function TabRequestExample(doc: Operation | null) {
  return doc?.requestExample && (
    <TabsTrigger value="requestSample" className="w-1/2 h-9">
      Exemplo de requisição
    </TabsTrigger>
  );
}

const Doc: React.FC<OperationProps> = ({ doc, openapi }) => {

  const queryParameters = QueryParameters(doc);
  const pathParameters = PathParameters(doc);
  const headerParameters = HeaderParameters(doc);
  const securityParameters = SecurityParameters(doc);
  const nodeSnippet = NodeSnippet(openapi, doc);
  const curlSnippet = CurlSnippet(openapi, doc);
  const pythonSnippet = PythonSnippet(openapi, doc);

  return (
    <div className="gde-operation--page">
      <div className="content">
        {DocTitle(doc)}
        {PathInfo(doc)}
        {Description(doc)}
        <Separator className="my-4" />
        {Groups(doc)}
        <Separator className="mt-4 mb-8" />
        {DocTabs(doc, headerParameters, queryParameters, pathParameters)}
      </div>
      {DocSidebar(securityParameters, curlSnippet, pythonSnippet, nodeSnippet)}
    </div>
  );
};

export default Doc;
