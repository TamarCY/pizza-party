import React, { useState } from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';



const EditPizza = () => {
    const [newTopping, setNewTopping] = useState("");
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);

    const handleChange = (id) => {
        const selected = [...partyObject.toppingsSelected]
        const indexOfChanged = partyObject.toppingsSelected.indexOf(id);
        if (indexOfChanged > -1) {
            selected.splice(indexOfChanged, 1)
        }
        else {
            selected.push(id)
        }
        setPartyObject({ ...partyObject, toppingsSelected: selected })
    }

    const addNewTopping = () => {
        const toppingOptionsCopy = [...partyObject.toppingOptions];
        const toppingsSelectedCopy = [...partyObject.toppingsSelected];
        if (newTopping) {
            toppingOptionsCopy.push(newTopping);
            setNewTopping("");
            const newToppingIndex = toppingOptionsCopy.length - 1;
            toppingsSelectedCopy.push(newToppingIndex)
            setPartyObject({ ...partyObject, toppingOptions: toppingOptionsCopy, toppingsSelected: toppingsSelectedCopy });
        }
    }

    const renderCheckbox = () => {
        if(!partyObject.toppingOptions){return <div>spinner...</div>}
        return partyObject.toppingOptions.map((item, index) => {
            return (
                <label key={item}>
                    <input type="checkbox" onChange={() => handleChange(index)} checked={partyObject.toppingsSelected.includes(index)} ></input>
                    <span>{item}</span>
                </label>
            )
        })
    }
    if(!partyObject){return <div>spinner...</div>}
    return (
        <div>
            <h2>Choose topping options</h2>
            <div>
                {renderCheckbox()}
            </div>
            <input type="text" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} />
            <button onClick={addNewTopping}>add</button>
        </div>

    )
}

export default EditPizza