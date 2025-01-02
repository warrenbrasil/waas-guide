import { OpenApiSchema } from "./OpenApiSchema";

export interface OpenApiRequestBody {
  description?: string; 
  required?: boolean;
  content: {
    [mediaType: string]: {
      schema: OpenApiSchema;
      example?: unknown;
      examples?: { [exampleName: string]: unknown };
    };
  };
}

