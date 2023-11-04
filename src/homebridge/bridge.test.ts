import { createBridge } from "./bridge";
import { HomebridgeAPI } from "homebridge/lib/api";
import exampleAccessory = require("./example-accessory");
import { Logger } from "homebridge/lib/logger";

describe("createBridge", () => {
  const pluginName = "ExampleSwitch";
  const logger = Logger.withPrefix("Home AI");

  beforeEach(() => {
    jest.spyOn(logger, "log").mockImplementation(() => {});
  });

  describe("addPluginByName", () => {
    it("should throw an error if the plugin is not registered", () => {
      const bridge = createBridge(logger);
      expect(() => bridge.addPluginByName(pluginName)).toThrow(
        "Could not find accessory"
      );
    });

    it("should add the plugin to the bridge", () => {
      const api = new HomebridgeAPI();
      const bridge = createBridge(logger, api);
      exampleAccessory(api);
      expect(() => bridge.addPluginByName(pluginName)).not.toThrow();
    });
  });

  describe("addPlugin", () => {
    it("should add the plugin to the bridge", () => {
      const bridge = createBridge(logger);
      bridge.addPlugin(exampleAccessory);
      expect(bridge.getPlugins().size).toBe(1);
    });

    it("registered plugin should have constructor called", () => {
      const bridge = createBridge(logger);
      const accessory = jest.fn();
      bridge.addPlugin(accessory);
      expect(accessory).toHaveBeenCalled();
    });
  });

  describe.skip("publish", () => {
    it("should publish the bridge", () => {
      const bridge = createBridge(logger);
      bridge.publish({ pinCode: "123-45-678", port: 47123 });
      expect(logger.log).toHaveBeenCalledWith(
        "Bridge published and reachable on port 47123 with pin code 123-45-678."
      );
    });
  });
});
