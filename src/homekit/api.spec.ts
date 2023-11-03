import { Service } from "hap-nodejs";
import { AccessoryPlugin, HomebridgeAPI, InternalAPIEvent } from "./api";

const api = new HomebridgeAPI();
const emitSpy = jest.spyOn(api, "emit");

class ExampleAccessory implements AccessoryPlugin {
  getServices(): Service[] {
    return [new Service.Switch("TestSwitch")];
  }
}

const pluginName = "homebridge-example";
const accessoryName = "MyCoolAccessory";

describe("HomebridgeAPI", () => {
  describe("HomebridgeAPI.prototype.registerAccessory", () => {
    it("should register accessory with legacy style signature", function () {
      api.registerAccessory(pluginName, accessoryName, ExampleAccessory);
      expect(emitSpy).toHaveBeenLastCalledWith(
        InternalAPIEvent.REGISTER_ACCESSORY,
        accessoryName,
        ExampleAccessory,
        pluginName
      );
    });

    it("should register accessory without passing plugin name", function () {
      api.registerAccessory(accessoryName, ExampleAccessory);
      expect(emitSpy).toHaveBeenLastCalledWith(
        InternalAPIEvent.REGISTER_ACCESSORY,
        accessoryName,
        ExampleAccessory
      );
    });
  });
});
