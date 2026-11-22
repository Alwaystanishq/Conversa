import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { backendURL } from "./config";

export const authClient = createAuthClient({
  baseURL: backendURL,
  fetchOptions: { credentials: "include" },
  plugins: [
    expoClient({ scheme: "mobile", storagePrefix: "conversa", storage: SecureStore, disableCache: true }),
  ],
});
