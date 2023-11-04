import { createBridge } from "./bridge";
import exampleAccessory from "./homebridge/example-accessory";

const port = 47123;
const pinCode = "031-45-154";

const bridge = createBridge();
bridge.addPlugin(exampleAccessory);

bridge.publish({ pinCode, port });

console.log(
  `Bridge published and reachable on port ${port} with pin code ${pinCode}.`
);
