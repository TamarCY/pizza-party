import { atom } from "recoil";

const partyState = atom({
  key: "partyObject", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export default partyState;