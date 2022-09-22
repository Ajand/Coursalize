import "../styles/globals.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { getDefaultProvider } from "ethers";
import { DataProvider } from "../lib/DataProvider";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

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
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: "10px !important" },
      },
    },
    MuiTypography: {},
  },
});

const { polygonMumbai} = chain

const { provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== polygonMumbai.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <DataProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </DataProvider>
    </WagmiConfig>
  );
}

export default MyApp;
