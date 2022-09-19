import "../styles/globals.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  typography: {},
  palette: {},
  components: {
    MuiPaper: {},
    MuiButton: {},
    MuiInputBase: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />{" "}
    </ThemeProvider>
  );
}

export default MyApp;
