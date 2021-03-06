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
import { useState } from 'react';
import pizza from "../../assets/images/pizza.png"
import "./signin.css"


const signTheme = createTheme(
    {
        palette: {
            primary: {
                main: "#FFAD60"
            }
        }
    }
);

export default function SignIn({ setAuthType }) {
    const setPartyObject = useSetRecoilState(partyState);
    const setLoggedIn = useSetRecoilState(loggedInState)
    const [loginFailed, setLoginFailed] = useState(false)
    const [inputErrorText, setInputErrorText] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const signinObject = {
            email: data.get('email'),
            password: data.get('password'),
        }
        try {
            const { data: { token, party } } = await Api.post("/party/signin", signinObject);
            setPartyObject(party)
            setLoggedIn(true)
            localStorage.setItem("token", token);
            navigate("/party")
        } catch (e) {
            setLoginFailed(true);
            setInputErrorText("Incorrect entry.")
            console.error(e.message);
        }
    };


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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={loginFailed}
                            helperText={inputErrorText}
                            onChange={() => { setLoginFailed(false); setInputErrorText(""); }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/sign-up" >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}