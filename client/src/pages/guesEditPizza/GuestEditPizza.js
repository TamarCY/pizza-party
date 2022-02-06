import React from "react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function GuestEditPizza() {
  const [toppings, setToppings] = useState("");
  const [amount, setAmount] = useState("");
  const partyObject = useRecoilValue(partyState);
  const setPartyObject = useSetRecoilState(partyState);

  const handleChange = (event) => {
    setToppings(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const renderToppings = () => {
    //   TODO: Add this to the schema
    const selectedNamesArray = partyObject.toppingsSelected.map((item) => {
      return partyObject.toppingOptions[item];
    });
    return selectedNamesArray.map((item, index) => {
      return (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  return (
    <div style={{ margin: "200px" }}>
      <h2>{`${partyObject.firstName} would like to know how many pizza and witch toppings would you like`}</h2>
      <FormControl sx={{ m: 3, maxWidth: 500, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-helper-label">Pizza</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={toppings}
          label="Toppings"
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          {renderToppings()}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label">Amount</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          // inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={0.5}>0.5</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={1.5}>1.5</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={2.5}>2.5</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={3.5}>3.5</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={4.5}>4.5</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <div>
      <Button variant="contained"  color="warning">Add</Button>
      </div>
    </div>
  );
}
