import type { AuthenticationData } from "@directus/sdk";

export const LOCAL_STORAGE_AUTH_DATA_KEY = "fork12-auth-data";

export const AUTH_DATA_COOKIES: Readonly<{
  [key in keyof AuthenticationData as Uppercase<key>]: key;
}> = {
  ACCESS_TOKEN: "access_token",
  EXPIRES: "expires",
  EXPIRES_AT: "expires_at",
  REFRESH_TOKEN: "refresh_token",
};
