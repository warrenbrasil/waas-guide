import { OpenApiSchema, ParsedProperty } from "@/types";

function transformObjectRecursively(property: unknown, parentKey = ''): ParsedProperty {
  if (isObjectProperty(property)) {
    return getObjectProperty(parentKey, property);
  }

  if (Array.isArray(property)) {
    return getArrayProperty(parentKey, property);
  }

  return getProperty(parentKey, property);
}

function getProperty(parentKey: string, property: unknown): ParsedProperty {
  return {
    name: parentKey,
    type: 'object',
    properties: mapProperties(property),
  };
}

function mapProperties(property: unknown): ParsedProperty[] | undefined {
  return Object.entries(property!).map(([key, value]) => transformObjectRecursively(value, key));
}

function isObjectProperty(property: unknown) {
  return !property || typeof property !== 'object';
}

function getArrayProperty(parentKey: string, property: unknown[]) {
  return {
    name: parentKey,
    type: 'array',
    properties: property.map((item, index) => transformObjectRecursively(item, String(index))),
  };
}

function getObjectProperty(parentKey: string, property: unknown): ParsedProperty {
  return {
    name: parentKey,
    type: typeof property,
    value: property as never,
  };
}

export function transformSecuritySchemes(securitySchemes: Record<string, OpenApiSchema>) {
  if (!securitySchemes || typeof securitySchemes !== 'object') return [];
  return Object.entries(securitySchemes).map(([name, value]) => {
    const transformedValue = transformObjectRecursively(value);
    return {
      name,
      properties: transformedValue.properties || [],
      type: transformedValue.type,
    };
  });
}