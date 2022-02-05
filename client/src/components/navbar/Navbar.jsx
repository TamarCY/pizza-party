import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import slice from "../../assets/images/slice.png"
import Api from "../../api/Api";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import { useEffect } from "react";
import tokenState from "../../Recoil/atoms/tokenAtom";

const useStyles = makeStyles(() => ({
    navbar: {
        backgroundColor: "#96CEB4",
        paddingRight: "79px",
        paddingLeft: "118px",
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
    const setToken = useSetRecoilState(tokenState);
    const token = useRecoilValue(tokenState);



    const handleClick = async (e) => {
        if (e.target.innerText === "LOGOUT"){
            console.log("handel click");
            setToken("")
            try {
                // TODO: delete token from localStorage
               await Api.post("/party/logout", partyObject)  
            } catch (error){
                console.log(error.message)
            }
        }
        if (e.target.innerText === "HOME") {
            console.log(token);
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
    console.log("token",token);
    if(!token) {return <div></div>}
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
        <AppBar className={navbar}>{displayDesktop()}</AppBar>
    </header>
);
}
