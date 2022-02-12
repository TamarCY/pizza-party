import { atom } from "recoil";

const tokenState = atom({
  key: "loggedIn", 
  default: false, 
});

export default tokenState;