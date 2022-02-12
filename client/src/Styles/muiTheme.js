import { createTheme } from "@mui/material/styles";
// import { COLORS } from "../constants/colors.constants";


const THEME = createTheme({
    typography: {
        fontFamily: 'Nunito'
    },
  palette: {
    primary: {
       main: "#D67D3E"

    },
    secondary: {
        main: "#FFAD60"
    },
  },
});


export default THEME;