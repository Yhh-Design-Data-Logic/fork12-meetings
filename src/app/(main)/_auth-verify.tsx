"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LOCAL_STORAGE_AUTH_DATA_KEY } from "@/api/client/constants";
import { validateAuth } from "@/lib/auth";

export const AuthVerification = () => {
  const router = useRouter();

  useEffect(() => {
    const authData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_AUTH_DATA_KEY) ?? `{}`
    );

    if (!validateAuth(authData)) {
      router.push("/login");
    }
  }, []);

  return null;
};
