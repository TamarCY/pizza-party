import React from "react";
import DessertPicker from "../dessertPicker/DessertPicker";
import { useState } from "react";
import "./editDessert.css"


const EditDessert = ({dessertOption1, dessertOption2, dessertOption3, setDessertOption1, setDessertOption2, setDessertOption3}) => {
    // const [dessertOption1, setDessertOption1] = useState("")
    // const [dessertOption2, setDessertOption2] = useState("")
    // const [dessertOption3, setDessertOption3] = useState("")
    const [isActive, setIsActive] = useState(true)
    const dessertList = ["Fruit salad", "Apple pie", "Lemon tart", "Ice cream", "Tiramisu", "Chocolate cake"]


    return (
        <div className="step-component">
            <h2>
                Choose 3 dessert options
            </h2>
            <h3>You can choose from the list or add your own</h3>
            <div className="ui toggle checkbox">
                <input checked={isActive} type="checkbox" name="public" onChange={() => (setIsActive(!isActive))} />
                <label>{`Dessert option ${isActive ? "active" : "disabled"}`}</label>
            </div>
            <div className="editDessert-select">
                <DessertPicker options={dessertList} setInputValue={setDessertOption1} inputValue={dessertOption1} disabled={!isActive} label={"Option 1"} />
                <DessertPicker options={dessertList} setInputValue={setDessertOption2} inputValue={dessertOption2} disabled={!isActive} label={"Option 2"} />
                <DessertPicker options={dessertList} setInputValue={setDessertOption3} inputValue={dessertOption3} disabled={!isActive} label={"Option 3"} />
            </div>
        </div>
    )
}

export default EditDessert