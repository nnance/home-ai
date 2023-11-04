import { Bridge, uuid } from "hap-nodejs";
import { HomebridgeAPI } from "homebridge/lib/api";
import { pluginManager } from "./homebridge/pluginManager";
import { createAccessory } from "./accessory";
import plugin from "homebridge-accessory-example";

// Create a new Bridge object
const bridgeUUID = uuid.generate("hap-nodejs:accessories:bridge");
const bridge = new Bridge("Home AI Bridge", bridgeUUID);

const api = new HomebridgeAPI();
const manager = pluginManager(api);
plugin(api);

const registeredPlugin = manager.getPlugins().get("ExampleSwitch");

if (!registeredPlugin) {
  throw new Error("Could not find accessory");
}

const service = createAccessory("ExampleSwitch", registeredPlugin, api);

// Add the switch accessory to the bridge
bridge.addBridgedAccessory(service);

export default bridge;
