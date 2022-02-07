import React from "react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import guestState from "../../Recoil/atoms/guestAtom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
// import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Link} from "react-router-dom"
import GuestPizzaList from "../../components/guestPizzaList/GuestPizzaList"


export default function GuestEditPizza() {
  const [toppings, setToppings] = useState("");
  const [amount, setAmount] = useState("");
  const [pizzasSelected, setPizzasSelected] = useState([])
  const partyObject = useRecoilValue(partyState);
  const setPartyObject = useSetRecoilState(partyState);
  const guestObject = useRecoilValue(guestState);
  const setGuestObject = useSetRecoilState(guestState);

  const handleDelete = (id) => {
      const filtered = pizzasSelected.filter((element)=>{return (element.id !== id)})
      setPizzasSelected(filtered)
  }

  const handleChange = (event) => {
    setToppings(event.target.value);
    console.log(toppings);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const addPizza = () => {
      const date = new Date()
      const id = date.getTime();
      const pizzasSelectedCopy = [...pizzasSelected];
      pizzasSelectedCopy.push({toppings, amount, id})
      setPizzasSelected(pizzasSelectedCopy)
      console.log(pizzasSelected);
  }

  const addSelectedArrayToGuest = async () => {
    //    setGuestObject({...guestObject, pizzasSelected})
        // const guestObjectCopy = {...guestObject}
       const guestObjectCopy = {...guestObject, pizzasSelected}
    //    TODO: Axios put guest object copy
  }

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
    <div style={{ marginTop: "200px" }}>
        {/* TODO: DELETE */}
      <h2>{`${partyObject.firstName} would like to know how much pizza and which toppings would you like`}</h2>
      <FormControl sx={{ m: 3, maxWidth: 500, minWidth: 400 }}>
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
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-helper-label">Pizza</InputLabel>
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
      <Button variant="contained"  color="warning" onClick={()=>(addPizza())}>Add</Button>
      </div>
      <GuestPizzaList pizzasSelected={pizzasSelected} handleDelete={handleDelete}/>
      <Link to="/guest-finished"><div onClick={addSelectedArrayToGuest}>Next</div></Link>
    </div>
  );
}
