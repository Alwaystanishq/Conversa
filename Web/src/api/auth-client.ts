import { createAuthClient } from "better-auth/react";
import { backendURL } from "./client";

export const authClient = createAuthClient({
  baseURL: backendURL,
  fetchOptions: { credentials: "include" },
});
