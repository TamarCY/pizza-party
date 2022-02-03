import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';
import {Button} from "@mui/material";
import "./homeParty.css"

// TODO: in the use useEffect renser the componnet only if there is a token

const HomeParty = () => {

    
    return (
        <div className="home-party-container">
        <div className="home-party-box">
            
            <Stack spacing={4} direction="column">
            <div className="home-party-logo"></div>
            <Button variant="contained">Edit Your Party</Button>
            <Button variant="contained">Your Guest Requests</Button>
           </Stack>
            </div>
        </div>
    )
}

export default HomeParty;