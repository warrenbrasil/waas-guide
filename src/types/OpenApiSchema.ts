export interface OpenApiSchema {
  $ref?: string;
  type?: string;
  format?: string;
  nullable?: boolean;
  description?: string;
  enum?: string[];
  required?: string[];
  properties?: { [key: string]: OpenApiSchema };
  items?: OpenApiSchema;
  additionalProperties?: boolean | OpenApiSchema;
  default?: unknown;
  example?: unknown;
  oneOf?: OpenApiSchema[];
  anyOf?: OpenApiSchema[];
  allOf?: OpenApiSchema[];
  
}
