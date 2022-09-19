/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Header = () => {
  const [domLoader, setDomLoader] = useState(false);

  useEffect(() => {
    setDomLoader(true);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  console.log(address);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!domLoader) return <></>;
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
            <>
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    disconnect();
                    handleClose();
                  }}
                >
                  Disconnect
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => connect()}>
                Connect
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
