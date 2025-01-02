export type ParsedProperty = {
  name: string;
  type: string;
  nullable?: boolean;
  description?: string;
  in?: string;
  value?: never;
  required?: boolean;
  readOnly?: boolean;
  example?: unknown;
  format?: string;
  items?: ParsedProperty[];
  properties?: ParsedProperty[];
  enumValues?: string[];
};