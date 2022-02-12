import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import GuestPizzaList from "../../components/guestPizzaList/GuestPizzaList";

export default function GuestEditPizza({ setPizzasSelected, pizzasSelected }) {
  const [toppings, setToppings] = useState("");
  const [amount, setAmount] = useState("");
  const partyObject = useRecoilValue(partyState);



  const handleDelete = (id) => {
    const filtered = pizzasSelected.filter((element) => {
      return element.id !== id;
    });
    setPizzasSelected(filtered);
  };

  const handleChange = (event) => {
    setToppings(event.target.value);
    console.log(toppings);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const addPizza = () => {
    const date = new Date();
    const id = date.getTime();
    const pizzasSelectedCopy = [...pizzasSelected];
    if (toppings && amount) {
      pizzasSelectedCopy.push({ toppings, amount, id });
      setPizzasSelected(pizzasSelectedCopy);
      setToppings("")
      setAmount(0)
    } else {
      console.log("empty");
    }
  };

  const renderToppings = () => {
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
    <div className="guestEditPizza step">
      <h2>Pick Your Desired Pizza(s)</h2>
      <div className="guestEditPizza">
        <FormControl sx={{ mr: 3, maxWidth: 500, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Topping</InputLabel>
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
        <FormControl sx={{ mr: 3, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Size"
            value={amount}
            onChange={handleAmountChange}
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
        <button class="circular ui icon button" onClick={() => addPizza()}>
          <i class="icon plus"></i>
        </button>
        <div>
        </div>
        <GuestPizzaList
          pizzasSelected={pizzasSelected}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
