import { authentication, createDirectus, rest } from "@directus/sdk";

import { LocalStorage } from "./storage/local-storage";
import { type Schema } from "./types";

const storage = new LocalStorage();

export const apiClient = createDirectus<Schema>(process.env.NEXT_PUBLIC_API_URL)
  .with(
    authentication("cookie", {
      credentials: "include",
      autoRefresh: true,
      storage,
    })
  )
  .with(rest({ credentials: "include" }));
