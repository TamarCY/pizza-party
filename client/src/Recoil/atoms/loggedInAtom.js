import { atom } from "recoil";

const tokenState = atom({
  key: "loggedIn", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default tokenState;