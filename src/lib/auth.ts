import { z } from "zod";

import { UserType } from "@/types";
import clientSideCookieStorage from "./cookie-client-side";

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

export const setUserTypeInCookie = (type: string) => {
  const validatedUserType = z
    .enum([UserType.TEACHER], {
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
