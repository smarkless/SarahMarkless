import AsyncStorage from "./AsyncStorage";
import type { AsyncStorageHook } from "./types";

export function useAsyncStorage(key: string): AsyncStorageHook {
  return {
    getItem: (...args) => AsyncStorage.getItem(key, ...args),
    setItem: (...args) => AsyncStorage.setItem(key, ...args),
  };
}
