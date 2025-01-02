import { OpenApiPathMethod } from ".";

export interface OpenApiPaths {
  [path: string]: {
    [method: string]: OpenApiPathMethod;
  };
}