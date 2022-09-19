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
      main: "#FFD61F",
      dark: "#F5C800"
    },
    secondary: {
      main: "#541388",
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
