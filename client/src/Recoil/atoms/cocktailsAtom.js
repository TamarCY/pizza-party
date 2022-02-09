
import { atom } from "recoil";

const cocktailsState = atom({
  key: "cocktailsArray", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

export default cocktailsState;