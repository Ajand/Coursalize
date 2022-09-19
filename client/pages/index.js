/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../components/Header";
import { Grid, Container } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { ethers } from "ethers";

const Home = () => {
  const course = {
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
      <Container
        css={css`
          margin-top: 2em;
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
