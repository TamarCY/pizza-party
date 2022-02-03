import React from "react";
import TimePicker from "../timePicker/TimePicker";
import { TextField } from "@mui/material";


export default function EditTime (){
    return (
        <div>
        <h2> Choose date time and location </h2>
        <TimePicker/>
        <TextField id="outlined-basic" label="Enter address" variant="outlined" />

        </div>
    )
}

// TODO: Design this page