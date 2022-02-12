import { atom } from "recoil";

const guestState = atom({
  key: "guestObject", 
  default: [], 
});

export default guestState;