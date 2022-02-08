import React from "react";
import axios from "axios";
import DrinksPicker from "../drinksPicker/DrinksPicker";


const EditDrinks = () => {

const fetchDrinks = async () => {
   const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
    console.log(response.data);
}

const cocktails = ["Old Fashioned", "Margarita", "Cosmopolitan", "Negroni", "Moscow Mule", "Martini", "Mojito", "Whiskey Sour", "Manhattan", "Spritz", "Gimlet", "Vesper", "Mimosa", "Daiquiri"]

const drinks = ["Orange juice", "Apple juice", "Lemonade", "Sparkling water", "Iced tea", "Beer", "White wine", "Red wine", "Coke", "Coke light", "Cider alcoholic", "Sprite", "Diet Sprite"]


    return (



        

        <div>
            <DrinksPicker list={cocktails} />
            <DrinksPicker list={drinks} />
        </div>
    )
}

export default EditDrinks






