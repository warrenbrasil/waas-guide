import { OpenApiJson, Operation, OpenApiPathMethod } from "@/types";

export function groupOperationsByTag(openApiSpec: OpenApiJson): Record<string, Operation[]> {
  const operationsByTag: Record<string, Operation[]> = {};

  Object.entries(openApiSpec.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, details]) => {
      const operation: Operation = {
        path,
        method,
        details: details as OpenApiPathMethod,
      };
      const tags = details.tags || [];
      tags.forEach((tag: string) => {
        if (!operationsByTag[tag]) {
          operationsByTag[tag] = [];
        }
        operationsByTag[tag].push(operation);
      });
    });
  });

  return operationsByTag;
}
