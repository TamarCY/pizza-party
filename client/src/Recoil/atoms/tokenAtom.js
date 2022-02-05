import { atom } from "recoil";

const tokenState = atom({
  key: "token", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default tokenState;