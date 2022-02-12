import { atom } from "recoil";

const partyState = atom({
  key: "partyObject", 
  default: {}, 
});

export default partyState;