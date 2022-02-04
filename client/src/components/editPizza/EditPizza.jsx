import React, { useState } from "react"


const EditPizza = ({partyObject, setPartyObject}) => {

    const handleChange = (id) => {
        const selected = [...partyObject.toppingsSelected]
        const indexOfChanged = partyObject.toppingsSelected.indexOf(id);
        if (indexOfChanged > -1) {
            selected.splice(indexOfChanged, 1)
        }
        else {
            selected.push(id)
        }
        console.log(selected);
        setPartyObject({...partyObject, toppingsSelected:selected})
    }


    const renderCheckbox = () => {
        return partyObject.toppingOptions.map((item, index) => {
            return (
                <label key={item}>
                    <input type="checkbox" onChange={() => handleChange(index)}></input>
                    <span>{item}</span>
                </label>
            )
        })
    }

    return (
        <div>
            <h2>Choose topping options</h2>
            <div>
            {renderCheckbox()}
            </div>
            { JSON.stringify(partyObject.toppingsSelected)}

        </div>

    )
}

export default EditPizza