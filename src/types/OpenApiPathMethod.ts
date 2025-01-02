import { OpenApiParameter, OpenApiRequestBody } from ".";

export interface OpenApiPathMethod {
  operationId: string;
  summary: string;
  description: string;
  tags: string[];
  parameters: OpenApiParameter[];
  requestBody: OpenApiRequestBody;
}
