import { OpenApiJson } from "@/types/OpenApiJson";

export async function fetchSpec(specURL: string): Promise<OpenApiJson> {
  const response = await fetch(specURL);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${specURL}: ${response.statusText}`);
  }
  const spec = await response.json();
  return spec;
}
