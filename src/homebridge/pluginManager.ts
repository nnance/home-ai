import {
  AccessoryName,
  AccessoryPluginConstructor,
  HomebridgeAPI,
  InternalAPIEvent,
} from "homebridge/lib/api";

export function pluginManager(api: HomebridgeAPI) {
  let plugins: Map<AccessoryName, AccessoryPluginConstructor> = new Map();

  const registrationHandler = (
    accessoryName: AccessoryName,
    constructor: AccessoryPluginConstructor
  ) => {
    plugins.set(accessoryName, constructor);
  };

  api.on(InternalAPIEvent.REGISTER_ACCESSORY, registrationHandler);

  return {
    getPlugins: () => plugins,
    getPlugin: (accessoryName: AccessoryName) => plugins.get(accessoryName),
    getAccessories: () => Array.from(plugins.keys()),
    getAccessory: (accessoryName: AccessoryName) => plugins.get(accessoryName),
  };
}
