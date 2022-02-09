import React, { useState } from "react";
// import axios from "axios";
import DrinksPicker from "../drinksPicker/DrinksPicker";


const EditDrinks = () => {
    const [selectedCocktails, setSelectedCocktails] = useState ([])
    const [selectedDrinks, setSelectedDrinks] = useState ([])

// const fetchDrinks = async () => {
//    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
//     console.log(response.data);
// }

const handleDrinksChange = (e) => {
    const {target: {value}} = e;
    setSelectedDrinks(value)
}

const handleCocktailsChange = (e) => {
    const {target: {value}} = e;
    setSelectedCocktails(value)
}

const cocktailsList = ["Old Fashioned", "Margarita", "Cosmopolitan", "Negroni", "Moscow Mule", "Martini", "Mojito", "Whiskey Sour", "Manhattan", "Spritz", "Gimlet", "Vesper", "Mimosa", "Daiquiri"]

const drinksList = ["Sparkling water", "Beer", "White wine", "Red wine",  "Orange juice", "Apple juice", "Lemonade", "Iced tea",  "Cider alcoholic", "Sprite", "Diet Sprite", "Coke", "Coke light",]

    return (
        <div>
            <DrinksPicker list={cocktailsList} placeholder={"Cocktails"} handleChange={handleCocktailsChange} drinkState={selectedCocktails} />
            <DrinksPicker list={drinksList} placeholder={"Drinks"} handleChange={handleDrinksChange} drinkState={selectedDrinks} />
        </div>
    )
}

export default EditDrinks






