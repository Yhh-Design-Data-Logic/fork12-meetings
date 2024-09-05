/* eslint-disable react/display-name */

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const ProvidersTree = buildProvidersTree([
    createProvider(QueryClientProvider, { client: queryClient }),
  ]);

  return (
    <ProvidersTree>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </ProvidersTree>
  );
}

///  Provider Composition Pattern
interface Provider<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, "children">;
}

function buildProvidersTree<TProvider extends Provider<any>>(
  providers: TProvider[]
) {
  const initialComponent: React.ComponentType<React.PropsWithChildren<any>> = ({
    children,
  }) => <>{children}</>;

  return providers.reduce(
    (AccumulatedComponents, { Component, props = {} }) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Component {...props}>{children}</Component>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
}

function createProvider<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
  props?: Omit<TProps, "children">
): Provider<TProps> {
  return { Component, props };
}
