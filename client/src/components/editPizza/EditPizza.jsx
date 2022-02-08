import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
        if (!partyObject.toppingOptions) { return <div>spinner...</div> }
        return partyObject.toppingOptions.map((item, index) => {
            return (
                // <FormControlLabel key={item}>
                // <Grid item xs={2} sm={8} md={8} key={index} sx={{m:2}}>
                <FormControlLabel
                    control={
                        <Checkbox onChange={() => handleChange(index)} checked={partyObject.toppingsSelected.includes(index)} />
                    }
                    label={item}
                />
                // </Grid>
            )
        })
    }
    if (!partyObject) { return <div>spinner...</div> }
    return (
        // <Box sx={{display: "flex", flexWrap: "wrap"}}>
        // <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 5, md: 8 }}>
        // <FormControl>
        //     {/* <h2>Choose topping options</h2> */}
        //     <FormLabel>Choose topping options</FormLabel>
        //     <FormGroup>

        //                 {renderCheckbox()}
        //                 </FormGroup>

        //         <input type="text" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} />
        //         <button onClick={addNewTopping}>add</button>
        // </FormControl>
        // </Grid>
        // </Box>

        <div style={{ width: '100%' }}>
            <FormControl>
                <h2>Choose topping options</h2>
                {/* <FormLabel>Choose topping options</FormLabel> */}

                <FormGroup>

                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: 'center', justifyContent: 'center' }}>

                        {renderCheckbox()}
                    </Box>
                </FormGroup>

            </FormControl>
            <div class="ui icon input">
                <input type="text" placeholder="Add topping" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} />
                <i class="inverted circular add link icon " onClick={addNewTopping}></i>
            </div>
            {/* <input type="text" value={newTopping} onChange={(e) => setNewTopping(e.target.value)} />
                <button class="ui orange button" onClick={addNewTopping}>add</button> */}

        </div>


    )
}

export default EditPizza