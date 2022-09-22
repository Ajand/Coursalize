/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Container, Typography } from "@mui/material";
import { ethers } from "ethers";
import CourseCard from "../components/CourseCard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { DataContext } from "../lib/DataProvider";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const { getAllCourses, tableland } = useContext(DataContext);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [courses, setCourses] = useState([]);

  const formatResult = (result) => {
    return result.rows.map((row, i) =>
      row.reduce((pV, cV, j) => {
        const nObj = { ...pV };
        nObj[result.columns[j].name] = cV;
        return nObj;
      }, {})
    );
  };

  useEffect(() => {
    const main = async () => {
      setLoadingInfo(true);
      const uCourses = await getAllCourses();
      setCourses(formatResult(uCourses));
      setLoadingInfo(false);
    };

    if (tableland) {
      main();
    }
  }, [tableland]);

  return (
    <div>
      <Header />
      <Hero />
      <Container
        css={css`
          margin-top: 3em;
          margin-bottom: 2em;
        `}
      >
        <Typography
          css={css`
            margin-bottom: 1em;
            font-weight: 700;
          `}
          variant="h5"
        >
          Most Popular Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item md={4}>
              <CourseCard key={course.id} course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
