import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "~/utils/trpc/server";

export const loader: LoaderFunction = ({ request }) => {
  return fetchRequestHandler({
    createContext: async () => {},
    endpoint: "/api/trpc",
    req: request as any,
    router,
  });
};

export const action: ActionFunction = ({ request }) => {
  return fetchRequestHandler({
    createContext: async () => {},
    endpoint: "/api/trpc",
    req: request as any,
    router,
  });
};
