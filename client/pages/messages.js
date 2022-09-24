/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../components/Header";
import { Grid, Container, Typography, Paper, InputBase } from "@mui/material";
import ConversationList from "../components/ConversationList";
import ConversationHeader from "../components/ConversationHeader";

const Messages = () => {
  return (
    <Container>
      <Header />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 80px);
          padding: 24px;
        `}
      >
        <Paper
          css={css`
            width: 100%;
            height: 700px;
            display: flex;
          `}
        >
          <ConversationList />
          <div
            css={css`
              width: calc(100% - 360px);
              position: relative;
            `}
          >
            <ConversationHeader />
            <div
              css={(theme) => css`
                position: absolute;
                width: 100%;
                bottom: 0;
                min-height: 56px;
                border-top: 1px solid ${theme.palette.divider};
                padding: 1em;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <InputBase
                multiline
                placeholder="Question or the answer ..."
                fullWidth
              />
            </div>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default Messages;
