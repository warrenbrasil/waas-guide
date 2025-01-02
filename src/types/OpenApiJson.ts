/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenApiParameter } from "./OpenApiParameter";
import { OpenApiPaths } from "./OpenApiPaths";
import { OpenApiSchema } from "./OpenApiSchema";

export interface OpenApiJson {
  openapi: string;
  servers?: {
    url: string;
  }[];
  info: {
    title: string;
    description: string;
    contact?: {
      name: string;
      url: string;
    };
    version: string;
  };
  paths: OpenApiPaths;
  components?: {
    schemas?: Record<string, OpenApiSchema>;
    parameters?: Record<string, OpenApiParameter>;
    securitySchemes?: Record<string, any>;
  };
}