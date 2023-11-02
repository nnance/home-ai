import { Bridge, uuid } from "hap-nodejs";
import switchAccessory from "./switch";

// Create a new Bridge object
const bridgeUUID = uuid.generate("hap-nodejs:accessories:bridge");
const bridge = new Bridge("Home AI Bridge", bridgeUUID);

// Add the switch accessory to the bridge
bridge.addBridgedAccessory(switchAccessory);

export default bridge;
