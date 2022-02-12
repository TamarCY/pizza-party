import { atom } from "recoil";

const drinksState = atom({
  key: "drinksArray", 
  default: [], 
});

export default drinksState;