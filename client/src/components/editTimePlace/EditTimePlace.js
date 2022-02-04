import React, { useState } from "react";
import TimePicker from "../timePicker/TimePicker";
import { TextField } from "@mui/material";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';



export default function EditTime (){
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    return (
        <div>
        <h2> Choose date time and location </h2>
        <TimePicker/>
        <TextField id="outlined-basic" label="Enter address" variant="outlined" value={partyObject.address} 
        onChange={(e)=>{setPartyObject({...partyObject, address:e.target.value})}}/>

        </div>
    )
}

// TODO: Design this page
// TODO: Add props management 