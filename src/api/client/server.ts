import { authentication, createDirectus, rest } from "@directus/sdk";

import { CookieStorage } from "@/api/client/storage/cookie";
import { type Schema } from "./types";

const storage = new CookieStorage();

export const apiClient = createDirectus<Schema>(process.env.NEXT_PUBLIC_API_URL)
  .with(
    authentication("json", {
      credentials: "include",
      autoRefresh: true,
      storage,
    })
  )
  .with(rest({ credentials: "include" }));
