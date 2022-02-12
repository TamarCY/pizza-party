import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import slice from "../../assets/images/slice.png"
import Api from "../../api/Api";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import loggedInState from "../../Recoil/atoms/loggedInAtom";
import "./navbar.css"

const useStyles = makeStyles(() => ({
    navbar: {
        backgroundColor: "#96CEB4",
        paddingLeft: "2rem",
        paddingRight: "3.4rem",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px", 
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
      logo: {
        height: "50px",
        width: "50px",
      }
}));

const headersData = [
    {
        label: "HOME",
        href: "/party"
    },
    {
        label: "LOGOUT",
        href: "/"
    }
]


export default function Navbar() {
    const { navbar, menuButton, toolbar, logo } = useStyles();
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    let loggedIn = useRecoilValue(loggedInState);

    
    useEffect(()=>{
        const localStorageToken = localStorage.getItem("token");
        if (!partyObject._id) {
        const loadParty = async () => {
            try{
               const {data: party} =  await Api.get("party/me", {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorageToken}`,
                    }
                  })
                  setLoggedIn(true)
                  setPartyObject(party)
            } catch (e) {
                console.log(e);
            }
        }
        loadParty()
    }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = async (e) => {
        if (e.target.innerText === "LOGOUT"){
            try {
                setLoggedIn(false)
                const token = localStorage.getItem("token")
                localStorage.removeItem("token")
               await Api.post("/party/logout", {token, id: partyObject._id})  
            } catch (error){
                console.log(error.message)
            }
        }
        if (e.target.innerText === "HOME") {
        }   
    }

    const displayDesktop = () => {
        return (
        <Toolbar className={toolbar}>
            {headerLogo}
            <div>{getMenuButtons()}</div>
        </Toolbar>
        )
};

const getMenuButtons = () => {
    if(!loggedIn) {return <div></div>}
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton
          }}
          onClick={(e)=>(handleClick(e))}
        >
           {label}
        </Button>
      );
    }
    )
  }

const headerLogo = (
    <Typography variant="h6" component="h1">
        <img src={slice} alt="pizza logo" className={logo} />
    </Typography>
);

return (
    <header>
        <AppBar position={"sticky"} className={navbar}>{displayDesktop()}</AppBar>
    </header>
);
}
