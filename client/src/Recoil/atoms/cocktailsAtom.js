import { atom } from "recoil";

const cocktailsState = atom({
  key: "cocktailsArray",
  default: {},
});

export default cocktailsState;
