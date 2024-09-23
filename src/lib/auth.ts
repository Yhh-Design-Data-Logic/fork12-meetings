import { z } from "zod";

import { UserType } from "@/types";

import clientSideCookieStorage from "./cookie-client-side";
import { UserSessionNotFoundError } from "./error";
import { USER_SESSION_COOKIE_KEY } from "./constants";

export const validateAuth = (data: {}) => {
  if (
    "access_token" in data &&
    "expires_at" in data &&
    typeof data.access_token === "string" &&
    typeof data.expires_at === "number"
  ) {
    return true;
  }

  return false;
};

export const saveUserSessionToStorage = (user: {
  type: string;
  name: string;
  parent?: number | null;
  teacher?: number | null;
}) => {
  const validatedUserType = z
    .enum([UserType.TEACHER, UserType.PARENT], {
      message: `Invalid user type: "${user.type}". Please contact administrator.`,
    })
    .parse(user.type);
  clientSideCookieStorage.setCookie(
    USER_SESSION_COOKIE_KEY,
    JSON.stringify({
      type: validatedUserType,
      name: user.name,
      ...(user.teacher && { teacher: user.teacher }),
      ...(user.parent && { parent: user.parent }),
    })
  );
};
export const getUserSessionFromStorage = () => {
  const userSession = clientSideCookieStorage.getCookie(
    USER_SESSION_COOKIE_KEY
  );

  if (!userSession && typeof window !== "undefined")
    throw new UserSessionNotFoundError();

  return JSON.parse(typeof window === "undefined" ? "{}" : userSession!) as
    | { type: UserType.PARENT; name: string; parent: number }
    | { type: UserType.TEACHER; name: string; teacher: number };
};
export const deleteUserSessionFromStorage = () => {
  clientSideCookieStorage.deleteCookie(USER_SESSION_COOKIE_KEY);
};
