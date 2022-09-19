import "../styles/globals.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from 'ethers'

const darkTheme = createTheme({
  typography: {},
  palette: {},
  components: {
    MuiPaper: {},
    MuiButton: {},
    MuiInputBase: {},
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
