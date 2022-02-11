import React from "react";
import { Autocomplete, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import DessertPicker from "../../components/dessertPicker/DessertPicker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import guestState from "../../Recoil/atoms/guestAtom";
import { Link } from "react-router-dom";
import Api from "../../api/Api";

const GuestEditDrinks = () => {
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    const guestObject = useRecoilValue(guestState);
    const setGuestObject = useSetRecoilState(guestState);

    const drinksList = partyObject.selectedDrinks.concat(partyObject.selectedCocktails)

// const handleSaveGuest = async () => {
//     try {
//         const guest = await Api.post("/guest/", guestObject);
//         console.log("guest response:", guest);
//       } catch (e) {
//         console.error(e.message);
//       }
// }

    const handelDrinkSelect = (e)=>{
        // console.log(e.target.innerText);
        setGuestObject({...guestObject, drinkSelected: e.target.innerText})
    }

    const handleDessertSelect = (e) => {
        setGuestObject({...guestObject, dessertSelected: e.target.value})
    }

    const renderRadio = () => {
        return partyObject.selectedDesserts.map((dessert)=> {return( 
            <FormControlLabel key={dessert} value={dessert} control={<Radio />} label={dessert} />
        )
        })
    }

    return (
        <>
            <h2>Choose Your Drink</h2>
            {/* <DessertPicker options={drinksList} setInputValue={setDessertOption1} inputValue={dessertOption1} disabled={!isActive} label={"Option 1"} /> */}
            <Autocomplete
            // TODO: CHECK ON SELECT
                onChange={handelDrinkSelect}
                disablePortal
                id="combo-box-demo"
                options={drinksList}
                renderInput={(params) => <TextField {...params} label="Drinks" />}
            />
      {/* <RadioGroup
      row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={guestObject.dessertSelected}
        onChange={handleDessertSelect}
      >
        {renderRadio()}
      </RadioGroup> */}
    
      {/* <Link to="/guest-finished" onClick={handleSaveGuest}>
            Next
        </Link> */}
</>
    )
}

export default GuestEditDrinks