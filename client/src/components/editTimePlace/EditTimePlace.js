import React, { useState } from "react";
import TimePicker from "../timePicker/TimePicker";
import { TextField } from "@mui/material";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';



export default function EditTime (){
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    console.log(partyObject);
    return (
        <div>
        <h2> Choose date time and location </h2>
        <TimePicker/>
        <TextField id="outlined-basic" label="Enter address" variant="outlined" value={partyObject.address} 
        onChange={(e)=>{setPartyObject({...partyObject, address:e.target.value})}}/>
        <h2>Enter your phone number</h2>
        <TextField id="outlined-basic" label="Enter phone number" variant="outlined" value={partyObject.phone} 
        onChange={(e)=>{setPartyObject({...partyObject, phone:e.target.value})}}/>
        </div>
    )
}

// TODO: Design this page
// TODO: Add props management 