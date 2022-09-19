import "../styles/globals.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Karla",
  },
  palette: {
    primary: {
      main: "#FFC624",
      dark: "#f5b400",
    },
    secondary: {
      main: "#34A3A6",
    },
    background: {
      default: "#f8f8f8",
      paper: "#fff",
      hero: "linear-gradient(125deg, rgba(240,236,196,1) 0%, rgba(242,241,230,1) 41%)",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "rgb(20 21 33 / 10%) 0px 2px 12px 0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiInputBase: {},
    MuiTypography: {},
  },
});

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default MyApp;
