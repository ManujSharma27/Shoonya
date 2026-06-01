import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "shoonya_profile";

export const useProfileStore = create((set, get) => ({
  selfieUri: null,
  displayName: "Priya Sharma",

  // Load from AsyncStorage on app start
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        set(data);
      }
    } catch (_) {}
  },

  setSelfie: async (uri) => {
    set({ selfieUri: uri });
    try {
      const current = get();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selfieUri: uri, displayName: current.displayName }),
      );
    } catch (_) {}
  },

  setDisplayName: async (name) => {
    set({ displayName: name });
    try {
      const current = get();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ selfieUri: current.selfieUri, displayName: name }),
      );
    } catch (_) {}
  },
}));
