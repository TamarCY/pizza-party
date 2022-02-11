import React from "react";
import party2 from "../../assets/images/party2.jpeg"
import { Link } from "react-router-dom"
import { Button } from "@mui/material";
import "./guestFinished.css"

export default function GuestFinished() {

    return (
        <div>
            <h2> Great! see you there...</h2>
            <img className="guestFinished-img" src={party2} alt="party" />
            <div>
                <Link to="/party"> <Button >Back to homepage</Button> </Link>
            </div>
        </div>
    )
}
