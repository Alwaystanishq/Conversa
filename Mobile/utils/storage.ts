import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "conversa_token";

export const storage = {
  setToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
