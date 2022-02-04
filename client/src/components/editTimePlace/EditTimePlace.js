import React, { useState } from "react";
import TimePicker from "../timePicker/TimePicker";
import { TextField } from "@mui/material";


export default function EditTime ({partyObject, setPartyObject}){
    return (
        <div>
        <h2> Choose date time and location </h2>
        <TimePicker partyObject={partyObject} setPartyObject={setPartyObject}/>
        <TextField id="outlined-basic" label="Enter address" variant="outlined" value={partyObject.address} onChange={(e)=>{setPartyObject({...partyObject, address:e.target.value})}}/>

        </div>
    )
}

// TODO: Design this page
// TODO: Add props management 