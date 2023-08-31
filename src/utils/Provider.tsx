"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      networkMode: "offlineFirst",
    },
    mutations: {
      retry: false,
      networkMode: "offlineFirst",
    },
  },
});

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
