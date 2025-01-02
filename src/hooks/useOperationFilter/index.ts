import { useCallback } from 'react';
import { findOperation } from './findOperation';
import { Operation } from '@/types';
import { OpenApiJson } from '@/types/OpenApiJson';

export const useOperationFilter = () => {
  return useCallback(
    (openApiJson: OpenApiJson, operationId: string): Operation => {
      return findOperation(openApiJson, operationId);
    },
    []
  );
};
