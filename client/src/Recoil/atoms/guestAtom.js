import { atom } from "recoil";

const guestState = atom({
  key: "guestObject", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default guestState;