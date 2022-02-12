import React from "react";
import TimePicker from "../timePicker/TimePicker";
import { TextField } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import "./editTimePlace.css";

export default function EditTime() {
  const partyObject = useRecoilValue(partyState);
  const setPartyObject = useSetRecoilState(partyState);
  return (
    <div className="editTime step-component">
      <h2> Pick time and location </h2>
      <div className="editTime-inputs">
        <TimePicker />
        <TextField
          sx={{ mt: 5 }}
          id="outlined-basic"
          label="Location"
          variant="outlined"
          value={partyObject.address}
          onChange={(e) => {
            setPartyObject({ ...partyObject, address: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
