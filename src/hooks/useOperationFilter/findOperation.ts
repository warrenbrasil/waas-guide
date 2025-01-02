import { OpenApiJson, Operation } from '@/types';
import { findMethod } from './findMethod';
import { extractRequestBodies, extractResponses } from './resolveSchema';

const cache = new Map<string, Operation>();

export const findOperation = (
  spec: OpenApiJson,
  operationId: string
): Operation => {
  const cacheKey = JSON.stringify({ spec, operationId });

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as Operation;
  }

  for (const [path, methods] of Object.entries(spec.paths)) {
    const methodResult = findMethod(methods, operationId);

    if (methodResult.details) {
      const requestBodies = extractRequestBodies(spec);
      const responses = extractResponses(spec);
      const schemaBody = (requestBodies || []).find((schema) => schema.path === path);
      const schemaResponse = (responses || []).filter((schema) => schema.path === path);
      const operation: Operation = {
        path,
        method: methodResult.method,
        details: methodResult.details,
        requestBody: schemaBody?.requestBody,
        requestExample: schemaBody?.example,
        responses: schemaResponse,
        responseExample: schemaResponse[0]?.example,
        components: spec.components,
      };

      cache.set(cacheKey, operation);
      return operation;
    }
  }

  const fallback: Operation = {
    path: '',
    method: '',
    details: null,
  };

  cache.set(cacheKey, fallback);
  return fallback;
};

