import { cookies } from "next/headers";
import type { AuthenticationData } from "@directus/sdk";
import { AUTH_DATA_COOKIES } from "../constants";

export class CookieStorage {
  get(): AuthenticationData {
    return {
      access_token:
        cookies().get(AUTH_DATA_COOKIES.ACCESS_TOKEN)?.value ?? null,
      expires: cookies().get(AUTH_DATA_COOKIES.EXPIRES)?.value
        ? +cookies().get(AUTH_DATA_COOKIES.EXPIRES)!.value
        : null,
      expires_at: cookies().get(AUTH_DATA_COOKIES.EXPIRES)?.value
        ? +cookies().get(AUTH_DATA_COOKIES.EXPIRES)!.value
        : null,
      refresh_token:
        cookies().get(AUTH_DATA_COOKIES.REFRESH_TOKEN)?.value ?? null,
    };
  }
  async set(values: AuthenticationData | null) {
    if (!values) {
      cookies().delete(AUTH_DATA_COOKIES.ACCESS_TOKEN);
      cookies().delete(AUTH_DATA_COOKIES.EXPIRES);
      cookies().delete(AUTH_DATA_COOKIES.EXPIRES_AT);
      cookies().delete(AUTH_DATA_COOKIES.REFRESH_TOKEN);
      return;
    }

    (Object.keys(values) as Array<keyof AuthenticationData>).forEach((key) => {
      if (values[key]) {
        cookies().set(key, `${values[key]}`, {
          httpOnly: true,
          path: "/",
        });
      } else {
        cookies().delete(key);
      }
    });
  }
}
