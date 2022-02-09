
import { atom } from "recoil";

const drinksState = atom({
  key: "drinksArray", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default drinksState;