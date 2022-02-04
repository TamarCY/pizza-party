import React, { useState } from "react"


const EditPizza = () => {
    const [toppingOptions, setTopingOptions] = useState(["onions", "olives", "pineapple"])
    // const [toppingOptions, setTopingOptions] = useState( [{id:1, name: "onions"}, {id:2, name: "olives"}, {id: 3, name: "pineapple"}])
    const [toppingsSelected, setToppingsSelected] = useState([])

    const handleChange = (id) => {
        const selected = [...toppingsSelected]
        const indexOfChanged = toppingsSelected.indexOf(id);
        if (indexOfChanged > -1) {
            selected.splice(indexOfChanged, 1)
        }
        else {
            selected.push(id)
        }
        setToppingsSelected(selected)
    }


    const renderCheckbox = () => {
        return toppingOptions.map((item, index) => {
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
            {renderCheckbox()}
        </div>
    )
}

export default EditPizza