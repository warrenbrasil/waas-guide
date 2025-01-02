import { OpenApiPathMethod } from "@/types";

export const findMethod = (
  methods: Record<string, OpenApiPathMethod>,
  operationId: string
): { method: string; details: OpenApiPathMethod | null } => {
  const methodEntry = Object.entries(methods).find(
    ([, details]) => details.operationId === operationId
  );

  if (methodEntry) {
    const [method, details] = methodEntry;
    return {
      method,
      details,
    };
  }
  else return {
    method: '',
    details: null,
  };
};
