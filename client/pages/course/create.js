/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import CourseForm from "../../components/CourseForm";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    category: "",
    price: "",
    cover: null,
    description: "",
  });

  const changeCourse = (key, value) => {
    const nCourse = { ...course };
    nCourse[key] = value;
    setCourse(nCourse);
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid item md={6}>
            <Paper
              css={css`
                margin-top: 4em;
                padding: 2em;
              `}
            >
              <Typography
                variant="h6"
                css={css`
                  margin-bottom: 0.5em;
                `}
              >
                Create a course
              </Typography>
              <Divider
                css={css`
                  margin-bottom: 1em;
                `}
              />
              <CourseForm />
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
