import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import guestState from "../../Recoil/atoms/guestAtom";

const GuestEditDesserts = () => {
  const partyObject = useRecoilValue(partyState);
  const setPartyObject = useSetRecoilState(partyState);
  const guestObject = useRecoilValue(guestState);
  const setGuestObject = useSetRecoilState(guestState);

  const handleDessertSelect = (e) => {
    setGuestObject({ ...guestObject, dessertSelected: e.target.value });
  };

  const renderRadio = () => {
    return partyObject.selectedDesserts.map((dessert) => {
      return (
        <FormControlLabel
          key={dessert}
          value={dessert}
          control={<Radio />}
          label={dessert}
        />
      );
    });
  };

  return (
    <div>
      <h2>Vote For Your Favorite Dessert</h2>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={guestObject.dessertSelected}
        onChange={handleDessertSelect}
        
      >
        {renderRadio()}
      </RadioGroup>
    </div>
  );
};

export default GuestEditDesserts;
