/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../components/Header";
import { Grid, Container } from "@mui/material";
import CourseCard from "../components/CourseCard";

const Home = () => {
  return (
    <div>
      <Header />
      <Container
        css={css`
          margin-top: 2em;
        `}
      >
        <Grid container spacing={4}>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
          <Grid item md={4}>
            <CourseCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
