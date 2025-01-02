import { Operation } from '@/types';
import { OpenApiJson } from '@/types/OpenApiJson';
import { useState, useEffect } from 'react';

const requestCache = new Map();

export function useFetchDoc(
  specURL: string,
  operationId: string,
  findOperation: (openapi: OpenApiJson, id: string) => Operation
): { doc: Operation | null; openapi: OpenApiJson | null } {
  const [data, setData] = useState<{ doc: Operation | null; openapi: OpenApiJson | null }>({
    doc: null,
    openapi: null,
  });

  useEffect(() => {
    fetchAndFindOperation(specURL, operationId, findOperation, setData);
  }, [specURL, operationId, findOperation]);

  return data;
}

const fetchAndFindOperation = async (
  specURL: string,
  operationId: string,
  findOperation: (openapi: OpenApiJson, id: string) => Operation,
  setData: (data: { doc: Operation | null; openapi: OpenApiJson | null }) => void
) => {
  const { operation, openapi } = await fetchSpecAndFindOperation(specURL, operationId, findOperation);
  setData({ doc: operation, openapi });
};

async function fetchSpecAndFindOperation(
  specURL: string,
  operationId: string,
  findOperation: (openapi: OpenApiJson, id: string) => Operation
): Promise<{ operation: Operation; openapi: OpenApiJson }> {
  const cacheKey = `${specURL}:${operationId}`;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const requestPromise = (async () => {
    try {
      const response = await fetch(specURL);
      const openapi = await response.json();
      const operation = findOperation(openapi, operationId);
      return { operation, openapi };
    } finally {
      requestCache.delete(cacheKey);
    }
  })();

  requestCache.set(cacheKey, requestPromise);
  return requestPromise;
}
