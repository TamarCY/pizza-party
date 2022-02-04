import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./homeParty.css";

// TODO: in the use useEffect renser the componnet only if there is a token

const HomeParty = () => {
  return (
    <div className="home-party-container">
      <div className="home-party-box">
        <Stack spacing={4} direction="column">
          <div className="home-party-logo"></div>
          <Link to="/edit-party">
            <Button variant="contained">Edit Your Party</Button>
          </Link>
          <Link to="/">
          <Button variant="contained">Your Guest Requests</Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
};

export default HomeParty;
