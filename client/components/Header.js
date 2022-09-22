/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import {
  Container,
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
import { useRouter } from "next/router";
import axios from "axios";
import { DataContext } from "../lib/DataProvider";

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

  const router = useRouter();

  const { courseUser } = useContext(DataContext);

  const { data: userData } = courseUser(address);

  useEffect(() => {
    if (userData === false) {
      router.push(`/profile/complete`);
    }
  }, [userData]);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!domLoader) return <></>;
  return (
    <Container>
      <div
        css={css`
          border-radius: 0;
          padding-top: 1em;
          padding-bottom: 1em;
          position: relative;
          z-index: 1000;
          width: 100%;
        `}
      >
        <div
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
            onClick={() => router.push("/")}
          >
            <Typography
              variant="h5"
              css={css`
                font-weight: 700;
              `}
              component="div"
              color="secondary"
              sx={{ flexGrow: 1 }}
            >
              Coursalize
            </Typography>
          </div>
          <div>
            {isConnected ? (
              <>
                {userData !== false && (
                  <Button
                    color="inherit"
                    onClick={() => router.push(`/course/create`)}
                  >
                    + Course
                  </Button>
                )}

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
                  <MenuItem
                    disabled={userData === false}
                    onClick={() => router.push(`/profile/${address}`)}
                  >
                    Profile
                  </MenuItem>
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => connect()}
                >
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
