/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
