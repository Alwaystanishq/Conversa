import * as SecureStore from 'expo-secure-store';

export const storage = {
  setToken: async (token: string) => {
    await SecureStore.setItemAsync('token', token);
  },

  getToken: async () => {
    return await SecureStore.getItemAsync('token');
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync('token');
  },
};
