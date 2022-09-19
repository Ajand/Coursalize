/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  console.log(address);

  return (
    <AppBar
      position="static"
      color="inherit"
      css={css`
        border-radius: 0;
      `}
    >
      <Toolbar
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            cursor: pointer;
          `}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Coursalize
          </Typography>
        </div>
        <div>
          {isConnected ? (
            <></>
          ) : (
            <>
              <Button onClick={() => connect()}>Connect</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
