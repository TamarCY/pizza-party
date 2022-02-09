import React from "react";
import DessertPicker from "../dessertPicker/DessertPicker";
import { useState } from "react";


const EditDessert = () => {
    const [dessertOption1, setDessertOption1] = useState("")
    const [dessertOption2, setDessertOption2] = useState("")
    const [dessertOption3, setDessertOption3] = useState("")
    const [isDisabled, setIsDisabeld] = useState(false)
    const dessertList = ["Apple pie", "Lemon tart", "Ice cream", "Tiramisu", "Chocolate cake"]
    return (
        <div>
            <DessertPicker options={dessertList} setInputValue={setDessertOption1} inputValue={dessertOption1} disabled={isDisabled} />
            <DessertPicker options={dessertList} setInputValue={setDessertOption2} inputValue={dessertOption2} disabled={isDisabled} />
            <DessertPicker options={dessertList} setInputValue={setDessertOption3} inputValue={dessertOption3} disabled={isDisabled} />
        </div>
    )
}

export default EditDessert