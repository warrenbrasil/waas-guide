import { ParsedProperty, ParsedSchema, SchemaObject } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type OpenAPI = {
  components?: {
    schemas?: Record<string, any>;
  };
  paths?: Record<string, any>;
};

function resolveSchemaRef(ref: string, components: Record<string, SchemaObject>): SchemaObject | undefined {
  const refName = ref.replace('#/components/schemas/', '');
  return components[refName];
}

function parseProperties(
  schema: SchemaObject, 
  components: Record<string, SchemaObject>, 
  seenRefs: Set<string> = new Set(), 
  depth: number = 10
): ParsedProperty[] | undefined {
  if (depth <= 0) {
    return [];
  }
  if (schema.$ref) {
    if (seenRefs.has(schema.$ref)) {
      return [];
    }
    seenRefs.add(schema.$ref);

    const resolvedSchema = resolveSchemaRef(schema.$ref, components);
    if (resolvedSchema) {
      return parseProperties(resolvedSchema, components, seenRefs, depth - 1);
    }
  } else if (schema.type === 'object' && schema.properties) {
    return Object.entries(schema.properties).map(([key, value]) => {
      const property = value as SchemaObject;
      return {
        name: key,
        type: property.type || 'object',
        nullable: property.nullable,
        description: property.description,
        required: property.required,
        readOnly: property.readOnly,
        example: property.example,
        format: property.format,
        enumValues: property.enum || undefined,
        properties: property.type === 'object' && property.$ref
          ? parseProperties(resolveSchemaRef(property.$ref, components) || {}, components, new Set(seenRefs), depth - 1)
          : parseProperties(property, components, new Set(seenRefs), depth - 1),
        items: property.type === 'array' ? parseProperties(property.items as SchemaObject, components, new Set(seenRefs), depth - 1) : undefined,
      };
    });
  } else if (schema.type === 'array' && schema.items) {
    return [{
      name: 'items',
      type: 'array',
      items: parseProperties(schema.items, components, seenRefs, depth - 1),
    }];
  } else if (schema.enum) {
    return [{
      name: schema.type || "enum",
      type: schema.type || "string",
      description: schema.description,
      enumValues: schema.enum,
    }];
  }

  return [];
}


function extractRequestBodies(openapi: OpenAPI): ParsedSchema[] | undefined {
  const components = openapi.components?.schemas || {};
  const paths = openapi.paths || {};
  const parsedSchemas: ParsedSchema[] = [];

  for (const [path, pathObject] of Object.entries(paths)) {
    for (const [, operationObject] of Object.entries<any>(pathObject)) {
      if (!operationObject.requestBody) continue;
      if (operationObject.requestBody?.content) {
        const content = operationObject.requestBody.content;
        const schema = content['application/json']?.schema || content['application/*+json']?.schema;
        const example = content['application/json']?.example || content['application/*+json']?.example;
        if (schema) {
          const parsedSchema = parseProperties(schema, components);
          parsedSchemas.push({
            path,
            requestBody: parsedSchema,
            example,
          });
        }
      }
    }
  }
  return parsedSchemas;
}

function extractResponses(openapi: OpenAPI): ParsedSchema[] | undefined {
  const components = openapi.components?.schemas || {};
  const paths = openapi.paths || {};
  const parsedSchemas: ParsedSchema[] = [];

  for (const [path, pathObject] of Object.entries(paths)) {
    for (const [, operationObject] of Object.entries<any>(pathObject)) {
      if (!operationObject.responses) continue;
      for (const [statusCode, responseObject] of Object.entries<any>(operationObject.responses)) {
        if (!responseObject.content) {
          parsedSchemas.push({
            path,
            statusCode,
            statusDescription: responseObject.description,
          })
          continue;
        }
        if (responseObject.content) {
          const content = responseObject.content;
          const schema = content['application/json']?.schema || content['text/plain']?.schema || content['application/*+json']?.schema;
          const example = content['application/json']?.schema || content['text/plain']?.schema || content['application/*+json']?.example;
          if (schema) {
            const parsedSchema = parseProperties(schema, components);
            parsedSchemas.push({
              path,
              statusCode,
              statusDescription: responseObject.description,
              responses: parsedSchema,
              example,
            });
          }
        }
      }
    }
  }
  return parsedSchemas;
}

export { extractRequestBodies, extractResponses };