"use client";

import { useEffect, useLayoutEffect } from "react";
import { type FallbackProps } from "react-error-boundary";

import { UserSessionNotFoundError } from "@/lib/error";

export const ErrorBoundaryPageFallback = ({ error }: FallbackProps) => {
  const isUserSessionNotFound = error instanceof UserSessionNotFoundError;

  useLayoutEffect(() => {
    let timer: NodeJS.Timeout;

    const redirectingElement = document.getElementById("redirecting-dots");
    if (isUserSessionNotFound && redirectingElement) {
      timer = setInterval(() => {
        switch (redirectingElement.innerText.length) {
          case 1:
            redirectingElement.innerText = "..";
            break;
          case 2:
            redirectingElement.innerText = "...";
            break;
          case 3:
            redirectingElement.innerText = "";
            break;
          default:
            redirectingElement.innerText = ".";
        }
      }, 300);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isUserSessionNotFound]);

  useEffect(() => {
    if (isUserSessionNotFound) {
      window.location.href = "/login";
    }
  }, [isUserSessionNotFound]);

  if (isUserSessionNotFound) {
    return (
      <div
        className="container flex h-full flex-col items-center justify-center"
        role="alert"
      >
        <p>Session Error.</p>
        <p className="">
          Redirecting to login page<span id="redirecting-dots">.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="container" role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};
