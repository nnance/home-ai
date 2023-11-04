import { HomebridgeAPI, InternalAPIEvent } from "homebridge/lib/api";
import plugin from "homebridge-accessory-example";
import { pluginManager } from "./pluginManager";

describe("PluginManager", () => {
  it("should register the plugin", () => {
    const api = new HomebridgeAPI();
    const manager = pluginManager(api);
    plugin(api);

    expect(manager.getPlugins().size).toBe(1);
    expect(manager.getPlugins().get("ExampleSwitch")).toBeDefined();
  });
});
