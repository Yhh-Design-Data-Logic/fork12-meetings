import { authentication, createDirectus, rest } from "@directus/sdk";
import { type Schema } from "./types";

export const apiClient = createDirectus<Schema>(process.env.NEXT_PUBLIC_API_URL)
  .with(authentication("cookie", { credentials: "include" }))
  .with(rest({ credentials: "include" }));
