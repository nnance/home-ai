import bridge from "./bridge";

const port = 47123;
const pinCode = "031-45-154";

bridge.publish({
  username: "1A:2B:3C:4D:5E:FF",
  pincode: pinCode,
  port,
  category: bridge.category,
});

console.log(
  `Bridge published and reachable on port ${port} with pin code ${pinCode}.`
);
