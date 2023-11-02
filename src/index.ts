import accessory from "./bridge";

const port = 47123;
const pinCode = "0314-5154";

accessory.publish({
  username: "1A:2B:3C:4D:5E:FF",
  pincode: pinCode,
  port,
  category: accessory.category,
});

console.log(
  `Accessory published and reachable on port ${port} with pin code ${pinCode}.`
);
