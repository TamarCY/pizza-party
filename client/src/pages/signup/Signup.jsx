import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from '../../api/Api'
import loggedInState from '../../Recoil/atoms/loggedInAtom';
import pizza from "../../assets/images/pizza.png"


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
  const setLoggedIn = useSetRecoilState(loggedInState)
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
      setLoggedIn(true);
      setPartyObject(party);
      localStorage.setItem("token", token);
      navigate("/party");
    } catch (e) {
      console.error(e.message)
    }
  }

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
          <img className="signin-img" src={pizza} alt={pizza} />
          <Typography component="h1" variant="h3">
            Pizza Party
          </Typography>
          <Typography component="h2" variant="h7" sx={{ m: 1 }}>
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
      </Container>
    </ThemeProvider>
  );
}