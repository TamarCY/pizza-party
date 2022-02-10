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
        <div style={{ marginTop: "100px" }}>
        <h2> Please enter your details </h2>
        <TextField 
        id="outlined-basic" label="Name" variant="outlined" value={guestObject.name} 
        onChange={(e)=>{setGuestObject({...guestObject, name:e.target.value})}}
        autoComplete="name"
        />
        <TextField 
        id="outlined-basic" label="Phone number" variant="outlined" value={guestObject.phone} 
        onChange={(e)=>{setGuestObject({...guestObject, phone:e.target.value})}}
        autoComplete="phone"
        />
          <TextField 
          type="number"
        id="outlined-basic" label="Guests number" variant="outlined" value={guestObject.guestsNumnber} 
        onChange={(e)=>{setGuestObject({...guestObject, guestsNumber:e.target.value})}}
        />
        </div>
    )
}