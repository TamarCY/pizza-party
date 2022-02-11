import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState} from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from '../../api/Api'
import tokenState from '../../Recoil/atoms/loggedInAtom';
import pizza from "../../assets/images/pizza.png"
// import "../signin.css"



const signTheme = createTheme(
  {
    palette: {
      primary: {
          main: "#FFAD60"
  
      }

  }
}
);

export default function SignUp() {
  const partyObject = useRecoilValue(partyState);
  const setToken = useSetRecoilState(tokenState)
  const setPartyObject = useSetRecoilState(partyState);
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    const partyObject = {
        firstName: event.target[0].value,
        lastName: event.target[2].value,
        phone: event.target[4].value,
        email: event.target[6].value,
        password: event.target[8].value,
    }
    try {
        const { data: { token, party } } = await Api.post("/party/signup", partyObject);
        setToken(token);
        // TODO: Change to  set recoil state isLoggedIn = true
        setPartyObject(party);
        localStorage.setItem("token", token);
        console.log(`welcome ${party.firstName}`);
        navigate("/party");

    } catch (e) {
        console.error(e.message)
    }
}


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     setFirstName(data.get('firstName'))
//     console.log(event);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

  return (
    <ThemeProvider theme={signTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
           {/* <LocalPizzaIcon sx={{ m: 5, color:"warning.main", fontSize:100}}/> */}
           <img className="signin-img" src={pizza} alt={pizza}/>

                    <Typography component="h1" variant="h3">
                         Pizza Party
                    </Typography>
                    <Typography component="h2" variant="h7" sx={{m:5}}>
                        Sign Up
                    </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}