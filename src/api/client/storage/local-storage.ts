"use client";

import type { AuthenticationData } from "@directus/sdk";

import { LOCAL_STORAGE_AUTH_DATA_KEY } from "../constants";

export class LocalStorage {
  get(): AuthenticationData | null {
    const jsonData = localStorage.getItem(LOCAL_STORAGE_AUTH_DATA_KEY);
    return jsonData ? JSON.parse(jsonData) : null;
  }
  set(data: AuthenticationData | null) {
    localStorage.setItem(LOCAL_STORAGE_AUTH_DATA_KEY, JSON.stringify(data));
  }
}
