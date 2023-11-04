import { Accessory, uuid } from "hap-nodejs";
import { AccessoryConfig, AccessoryPluginConstructor } from "homebridge";
import { HomebridgeAPI } from "homebridge/lib/api";
import { Logger } from "homebridge/lib/logger";

export function createAccessory(
  name: string,
  plugin: AccessoryPluginConstructor,
  api: HomebridgeAPI
) {
  const logger = Logger.withPrefix(name);
  const config: AccessoryConfig = {
    accessory: "ExampleSwitch",
    name,
  };

  const accessory = new plugin(logger, config, api);

  const switchUUID = uuid.generate(`hap-nodejs:accessories:${name}`);
  const switchAccessory = new Accessory(name, switchUUID);

  accessory.getServices().forEach((service, index) => {
    //TODO: This is a hack to get the switch service to show up
    if (index === 1) {
      switchAccessory.addService(service);
    }
  });

  return switchAccessory;
}
