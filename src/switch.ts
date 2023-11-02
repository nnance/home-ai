import { Accessory, Characteristic, Service, uuid } from "hap-nodejs";

const switchUUID = uuid.generate("hap-nodejs:accessories:switch");
const switchAccessory = new Accessory("Virtual Switch", switchUUID);

const switchService = new Service.Switch("Switch");

switchService
  .getCharacteristic(Characteristic.On)
  .on("get", (callback) => {
    callback(null, false);
  })
  .on("set", (value, callback) => {
    console.log(`Switch state changed to ${value}`);
    callback();
  });

switchAccessory.addService(switchService);

export default switchAccessory;
