import { useEffect, useState } from "react";
import config from "@/config";
import { OpenApiJson } from "@/types";
import { fetchSpec } from "./fetchSpec";

export function useFetchSpecs() {
  const [specs, setSpecs] = useState<OpenApiJson[]>([]);
  const [canFetch, setCanFetch] = useState(false);
  useEffect(() => {
    setCanFetch(true);
    const fetchSpecs = async () => {
      try {
        const urls = Object.values(config.specs);
        const fetchedSpecs = await Promise.all(urls.map(fetchSpec));
        setSpecs(fetchedSpecs);
      } catch (error) {
        console.error("Failed to fetch specs", error);
      }
    };

    if (canFetch) fetchSpecs();
  }, [canFetch]);

  return specs;
}
