import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import slice from "../../assets/images/slice.png"
import Api from "../../api/Api";
import {useRecoilValue} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';

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
        label: "Home",
        href: "/party"
    },
    {
        label: "Logout",
        href: "/"
    }
]




export default function Navbar() {
    const { navbar, menuButton, toolbar, logo } = useStyles();
    const partyObject = useRecoilValue(partyState);


    const handleClick = async (e) => {
        if (e.target.innerText === "LOGOUT"){
            try {
            console.log(partyObject.tokens);
              const response = await Api.post("/party/logout", partyObject)  
              console.log(response);
            } catch (error){
                console.log(error.message)
            }
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
    });
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
