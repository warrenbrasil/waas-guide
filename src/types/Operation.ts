/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenApiParameter, OpenApiPathMethod, OpenApiSchema, ParsedSchema } from ".";

export interface Operation {
  path: string;
  method: string;
  details: OpenApiPathMethod | null;
  requestBody?: any;
  requestExample?: any;
  responses?: ParsedSchema[];
  responseExample?: any;
  components?: {
    schemas?: Record<string, OpenApiSchema>;
    parameters?: Record<string, OpenApiParameter>;
    securitySchemes?: Record<string, OpenApiSchema>;
  };
};