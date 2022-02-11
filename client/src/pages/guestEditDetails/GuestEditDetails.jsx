import React, { useState } from "react";
import { TextField } from "@mui/material";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import guestState from "../../Recoil/atoms/guestAtom";
import { Link } from "react-router-dom";



export default function GuestEditDetails (){
    const setGuestObject = useSetRecoilState(guestState);
    const guestObject = useRecoilValue(guestState);

   

    return (
        <div>
        <h2> Enter Your Details </h2>
        <TextField sx={{m:1}}
        id="outlined-basic" label="Name" variant="outlined" value={guestObject.name} 
        onChange={(e)=>{setGuestObject({...guestObject, name:e.target.value})}}
        autoComplete="name"
        />
        <TextField sx={{m:1}}
        id="outlined-basic" label="Phone number" variant="outlined" value={guestObject.phone} 
        onChange={(e)=>{setGuestObject({...guestObject, phone:e.target.value})}}
        autoComplete="phone"
        />
          <TextField sx={{m:1}} 
          type="number"
        id="outlined-basic" label="Guests number" variant="outlined" value={guestObject.guestsNumber} 
        onChange={(e)=>{setGuestObject({...guestObject, guestsNumber:e.target.value})}}
        />
        </div>
    )
}