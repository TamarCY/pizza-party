import React, { useState } from "react";
import DrinksPicker from "../drinksPicker/DrinksPicker";
import { useRecoilValue } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';



const EditDrinks = ({ selectedCocktails, setSelectedCocktails, selectedDrinks, setSelectedDrinks }) => {
    const [isActive, setIsActive] = useState(true)
    const partyObject = useRecoilValue(partyState);

    const cocktailsList = ["Old Fashioned", "Margarita", "Cosmopolitan", "Negroni", "Moscow Mule", "Martini", "Mojito", "Whiskey Sour", "Manhattan", "Spritz", "Gimlet", "Vesper", "Mimosa", "Daiquiri"]
    const drinksList = ["Sparkling water", "Beer", "White wine", "Red wine", "Orange juice", "Apple juice", "Lemonade", "Iced tea", "Cider alcoholic", "Sprite", "Diet Sprite", "Coke", "Coke light",]

    const handleDrinksChange = (e) => {
        const { target: { value } } = e;
        setSelectedDrinks(value)
    }

    const handleCocktailsChange = (e) => {
        const { target: { value } } = e;
        setSelectedCocktails(value)
    }


    return (
        <div className="step-component">
            <h2>Pick drink options</h2>
            {/* TODO: add active button and if disabled dont let the guset see drinks options */}
            {/* <div className="ui toggle checkbox">
                <input checked={isActive} type="checkbox" name="public" onChange={()=> (setIsActive(!isActive))}/>
                    <label> {`Drinks option ${isActive?"active":"disabled"}`}</label>
            </div> */}
            <DrinksPicker list={cocktailsList} placeholder={"Cocktails"} handleChange={handleCocktailsChange} drinkState={selectedCocktails} disabled={!isActive} />
            <DrinksPicker list={drinksList} placeholder={"Drinks"} handleChange={handleDrinksChange} drinkState={selectedDrinks} disabled={!isActive} />
        </div>
    )
}

export default EditDrinks






