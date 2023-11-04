import { HomebridgeAPI } from "homebridge/lib/api";
import plugin from "./example-accessory";
import { pluginManager } from "./pluginManager";
import { Logger } from "homebridge/lib/logger";
import { Access, AccessoryConfig } from "homebridge";
import exp from "constants";

describe("PluginManager", () => {
  it("should register the plugin", () => {
    const api = new HomebridgeAPI();
    const manager = pluginManager(api);
    plugin(api);

    expect(manager.getPlugins().size).toBe(1);
    expect(manager.getPlugins().get("ExampleSwitch")).toBeDefined();
  });

  it("registered plugin should have a constructor", () => {
    const api = new HomebridgeAPI();
    const manager = pluginManager(api);
    plugin(api);

    const accessory = manager.getPlugins().get("ExampleSwitch");
    if (accessory) {
      const logger = Logger.withPrefix("TestSwitch");
      const config: AccessoryConfig = {
        accessory: "ExampleSwitch",
        name: "TestSwitch",
        platform: "ExamplePlatform",
        switch: "TestSwitch",
      };
      const newAccessory = new accessory(logger, config, api);
      expect(newAccessory.getServices().length).toBe(2);
    }
  });
});
