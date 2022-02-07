import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import slice from "../../assets/images/slice.png"
import Api from "../../api/Api";
import {useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
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
    const setPartyObject = useSetRecoilState(partyState);
    const setToken = useSetRecoilState(tokenState);
    let token = useRecoilValue(tokenState);

    // if(!token) {
    //  token = localStorage.getItem("token")
    // }
    

    useEffect(()=>{
        const localStorageToken = localStorage.getItem("token")
        console.log(partyObject);
        // TODO: Why not !partyObject OR partyObject == {} ????
        if (partyObject !== {}) {
        const loadParty = async () => {
            try{
               const {data: party} =  await Api.get("party/me", {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorageToken}`,
                    }
                  })
                  setToken(token)
            // TODO: Change to  set recoil state isLoggedIn = true
                  setPartyObject(party)
            } catch (e) {
                console.log(e.message);
            }
        }
        loadParty()
    }        
    },[])

    const handleClick = async (e) => {
        if (e.target.innerText === "LOGOUT"){
            try {
                setToken("")
                // TODO: delete token from localStorage
                localStorage.removeItem("token")
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
