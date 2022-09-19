/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Typography, Button } from "@mui/material";
import Image from "next/image";

const Hero = () => {
  return (
    <Container>
      <div
        css={(theme) =>
          css`
            background: ${theme.palette.background.hero};
            height: 450px;
            position: relative;
            border-radius: 20px;
          `
        }
      >
        <div
          css={css`
            padding: 2em;
            padding-top: 4.5em;
          `}
        >
          <Typography
            css={css`
              font-weight: 700;
            `}
            variant="h3"
          >
            Let's{" "}
            <span
              css={(theme) =>
                css`
                  color: ${theme.palette.secondary.main};
                `
              }
            >
              coordinate
            </span>
            <br /> learning
          </Typography>
          <Typography
            variant="h5"
            css={css`
              margin-top: 1.5em;
            `}
          >
            Join{" "}
            <span
              css={(theme) =>
                css`
                  background: black;
                  color: ${theme.palette.primary.main};
                  padding: 2px 3px;
                `
              }
            >
              Coursalize
            </span>{" "}
            to build an <br /> internet native learning experince
          </Typography>
          <div css={css`margin-top: 3em`}>
            <Button color="primary" variant="contained">
              Browse Our Courses
            </Button>
            <Button css={css`margin-left: 1em`} color="inherit" variant="outlined">
              Become An Instructor
            </Button>
          </div>
        </div>
        <div
          css={css`
            position: absolute;
            bottom: -100px;
            right: -50px;
          `}
        >
          <Image src="/hero.svg" width="650" height="650" />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
