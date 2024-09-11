import { z } from "zod";

import { UserType } from "@/types";
import clientSideCookieStorage from "./cookie-client-side";
import { UserSessionNotFoundError } from "./error";

export const validateAuth = (data: {}) => {
  if (
    "access_token" in data &&
    "expires_at" in data &&
    typeof data.access_token === "string" &&
    typeof data.expires_at === "number"
  ) {
    if (data.expires_at > Date.now()) return true;
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
    "fork12-conference-user",
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
    "fork12-conference-user"
  );

  if (!userSession) throw new UserSessionNotFoundError();

  return JSON.parse(userSession) as
    | { type: UserType.PARENT; name: string; parent: number }
    | { type: UserType.TEACHER; name: string; teacher: number };
};
export const deleteUserSessionFromStorage = () => {
  clientSideCookieStorage.deleteCookie("fork12-conference-user");
};

export const setUserTypeInCookie = (type: string) => {
  const validatedUserType = z
    .enum([UserType.TEACHER, UserType.PARENT], {
      message: `Invalid user type: "${type}". Please contact administrator.`,
    })
    .parse(type);
  clientSideCookieStorage.setCookie("user-type", validatedUserType);
};

export const getUserTypeFromCookie = (): UserType | null => {
  const userType = clientSideCookieStorage.getCookie("user-type");

  return userType as UserType | null;
};

export const deleteUserTypeFromCookie = () => {
  clientSideCookieStorage.deleteCookie("user-type");
};
