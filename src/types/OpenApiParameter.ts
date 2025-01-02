export interface OpenApiParameter {
  name: string;
  in?: string;
  description: string;
  required: boolean;
  readOnly: boolean;
  example?: string;
  schema: {
    type: string;
    format: string;
  };
}