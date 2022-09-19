/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import CourseForm from "../../components/CourseForm";

const CreateCourse = () => {
  const [course, setCourseInput] = useState({
    title: "",
    category: "",
    price: "",
    cover: null,
    description: "",
  });

  const setCourse = (key, value) => {
    const nCourse = { ...course };
    nCourse[key] = value;
    setCourseInput(nCourse);
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
              <CourseForm course={course} setCourse={setCourse} />
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
