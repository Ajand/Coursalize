/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Container } from "@mui/material";
import { ethers } from "ethers";
import CourseCard from "../components/CourseCard";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  const course = {
    title: "The Complete 2022 Web Development Bootcamp",
    cover: "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    category: 0,
    price: String(ethers.utils.parseEther("500")),
    instructor: {
      name: "Dr. Angela Yu",
      avatar: "https://img-c.udemycdn.com/user/200_H/31334738_a13c_2.jpg",
    },
  };

  const courses = Array(12)
    .fill(0)
    .map((c, i) => ({ ...course, id: i }));

  return (
    <div>
      <Header />
      <Hero />
      <Container
        css={css`
          margin-top: 1em;
          margin-bottom: 2em;
        `}
      >
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
