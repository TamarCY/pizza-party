import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import DessertPicker from "../../components/dessertPicker/DessertPicker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import guestState from "../../Recoil/atoms/guestAtom";

const GuestEditDrinks = () => {
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    const guestObject = useRecoilValue(guestState);
    const setGuestObject = useSetRecoilState(guestState);

    const drinksList = partyObject.selectedDrinks.concat(partyObject.selectedCocktails)

    const handelSelect = (e)=>{
        // console.log(e.target.innerText);
        setGuestObject({...guestObject, drinkSelected: e.target.innerText})
    }

    return (
        <div style={{ marginTop: "200px" }}>
            <h2>Choose a drink</h2>
            {/* <DessertPicker options={drinksList} setInputValue={setDessertOption1} inputValue={dessertOption1} disabled={!isActive} label={"Option 1"} /> */}
            <Autocomplete
                onChange={handelSelect}
                disablePortal
                id="combo-box-demo"
                options={drinksList}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Drinks" />}
            />
        </div>
    )
}

export default GuestEditDrinks