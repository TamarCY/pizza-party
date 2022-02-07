import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./homeParty.css";
import { useRecoilValue } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from '../../api/Api'



// TODO: in the use useEffect renser the componnet only if there is a token


const HomeParty = () => {
    const partyObject = useRecoilValue(partyState);

  return (
    <div className="home-party-container">
      <div className="home-party-box">
        <Stack spacing={4} direction="column">
          <div className="home-party-logo"></div>
          <Link to="/edit-party">
            <Button variant="contained">Edit Your Party</Button>
          </Link>
          <Link to="/party-requests">
          <Button variant="contained">Your Guest Requests</Button>
          </Link>
          <Link to={`/guest-invitation/${partyObject._id}`}>
          <Button variant="contained">The invitation sent to your guests</Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
};


export default HomeParty;
