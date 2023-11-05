import { Bridge, uuid } from "hap-nodejs";
import {
  AccessoryName,
  AccessoryPluginConstructor,
  HomebridgeAPI,
  InternalAPIEvent,
} from "homebridge/lib/api";
import { createAccessory } from "./accessory";
import { Logger } from "homebridge/lib/logger";

const BRIDGE_NAME = "Home AI Bridge";

export function createBridge(
  logger = Logger.withPrefix(BRIDGE_NAME),
  api = new HomebridgeAPI()
) {
  const bridgeUUID = uuid.generate("hap-nodejs:accessories:bridge");
  const bridge = new Bridge(BRIDGE_NAME, bridgeUUID);

  const plugins: Map<AccessoryName, AccessoryPluginConstructor> = new Map();

  function addToBridge(
    accessoryName: AccessoryName,
    constructor: AccessoryPluginConstructor
  ) {
    const service = createAccessory(accessoryName, constructor, api, logger);
    bridge.addBridgedAccessory(service);
  }

  api.on(InternalAPIEvent.REGISTER_ACCESSORY, (accessoryName, constructor) => {
    plugins.set(accessoryName, constructor);
  });

  return {
    addPluginByName: (pluginName: string) => {
      const registeredPlugin = plugins.get(pluginName);

      if (!registeredPlugin) {
        throw new Error("Could not find accessory");
      }

      addToBridge(pluginName, registeredPlugin);
    },

    addPlugin(plugin: (api: HomebridgeAPI) => void) {
      plugin(api);
      api.
    },

    getPlugins: () => plugins,

    publish: ({ pinCode, port }: { pinCode: string; port: number }) => {
      bridge.publish(
        {
          username: "1A:2B:3C:4D:5E:FF",
          pincode: pinCode,
          port,
          category: bridge.category,
        },
        false
      );
    },
  };
}
