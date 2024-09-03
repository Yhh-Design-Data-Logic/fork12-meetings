import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

import { DirectusError } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isZodError(err: unknown): err is ZodError {
  return err instanceof ZodError;
}

export const isDirectusError = (error: unknown): error is DirectusError => {
  if (error && typeof error === "object" && "errors" in error) {
    return true;
  }

  return false;
};
