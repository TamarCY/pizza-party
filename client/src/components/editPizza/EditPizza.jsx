import { Checkbox, FormControl, FormControlLabel, FormGroup, Box } from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import './editPizza.css'


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
        if (!partyObject.toppingOptions) { return <div className="loader"></div> }
        return partyObject.toppingOptions.map((item, index) => {
            return (
                <FormControlLabel
                    control={
                        <Checkbox onChange={() => handleChange(index)} checked={partyObject.toppingsSelected.includes(index)} />
                    }
                    label={item}
                />
            )
        })
    }
    if (!partyObject) { return <div className="loader"></div> }
    return (
        <div style={{ width: '100%' }} >
            <div className="step-component">
                <FormControl>
                    <h2>Pick topping options</h2>
                    <FormGroup>
                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: 'center', justifyContent: 'center' }}>
                            {renderCheckbox()}
                        </Box>
                    </FormGroup>
                    <div className="editPizza-input ui icon input">
                        <input type="text" placeholder="Add topping" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} />
                        <i class="inverted circular add link icon " onClick={addNewTopping}></i>
                    </div>
                </FormControl>
            </div>
        </div>
    )
}

export default EditPizza