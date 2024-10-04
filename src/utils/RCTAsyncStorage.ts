import { NativeModules, TurboModuleRegistry } from "react-native";

// TurboModuleRegistry falls back to NativeModules so we don't have to try go
// assign NativeModules' counterparts if TurboModuleRegistry would resolve
// with undefined.
let RCTAsyncStorage = TurboModuleRegistry
  ? TurboModuleRegistry.get("PlatformLocalStorage") || // Support for external modules, like react-native-windows
    TurboModuleRegistry.get("RNC_AsyncSQLiteDBStorage") ||
    TurboModuleRegistry.get("RNCAsyncStorage")
  : NativeModules["PlatformLocalStorage"] || // Support for external modules, like react-native-windows
    NativeModules["RNC_AsyncSQLiteDBStorage"] ||
    NativeModules["RNCAsyncStorage"];

export default RCTAsyncStorage;
