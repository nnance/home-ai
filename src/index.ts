import { Categories } from "hap-nodejs";
import switchAccessory from "./switch";

switchAccessory.publish({
  username: "1A:2B:3C:4D:5E:FF",
  pincode: "031-45-154",
  port: 47123,
  category: Categories.SWITCH,
});

console.log("Accessory published and reachable on port 47123.");
