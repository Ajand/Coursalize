/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Divider } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <div
      css={css`
        border-radius: 0 12px 0 0;
      `}
      position="static"
      color="inherit"
    >
      <Toolbar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />

        <Typography
          css={css`
            margin-left: 1em;
          `}
        >
          Aj Maz
        </Typography>
      </Toolbar>
      <Divider />
    </div>
  );
}
