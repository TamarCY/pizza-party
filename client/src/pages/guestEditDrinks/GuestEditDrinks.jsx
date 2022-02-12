import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from "../../Recoil/atoms/partyAtom";
import guestState from "../../Recoil/atoms/guestAtom";

const GuestEditDrinks = () => {
    const partyObject = useRecoilValue(partyState);
    const guestObject = useRecoilValue(guestState);
    const setGuestObject = useSetRecoilState(guestState);

    const drinksList = partyObject.selectedDrinks.concat(partyObject.selectedCocktails)

    const handelDrinkSelect = (e) => {
        setGuestObject({ ...guestObject, drinkSelected: e.target.innerText })
    }

    return (
        <>
            <h2>Pick Your Drink</h2>
            <Autocomplete
                onChange={handelDrinkSelect}
                disablePortal
                id="combo-box-demo"
                options={drinksList}
                renderInput={(params) => <TextField {...params} label="Drink" />}
            />
        </>
    )
}

export default GuestEditDrinks