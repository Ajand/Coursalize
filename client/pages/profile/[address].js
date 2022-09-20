/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../../components/Header";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import CourseCard from "../../components/CourseCard";
import { ethers } from "ethers";

const Profile = () => {
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

  const courses = Array(6)
    .fill(0)
    .map((c, i) => ({ ...course, id: i }));
  return (
    <div>
      <Header />
      <Container
        css={css`
          margin-top: 2em;
          margin-bottom: 5em;
        `}
      >
        <Grid container>
          <Grid item md={8}>
            <Typography
              css={css`
                font-weight: 700;
                margin-bottom: 0.1em;
              `}
              variant="h4"
            >
              Dr. Angela Yu
            </Typography>
            <Typography variant="h6">Developer and Lead Instructor</Typography>
            <Typography
              css={css`
                margin-top: 1em;
                font-size: 1.5em;
                font-weight: 600;
                margin-bottom: 0.25em;
              `}
              variant="h5"
            >
              About me
            </Typography>
            <Typography variant="body1">
              I'm Angela, I'm a developer with a passion for teaching. I'm the
              lead instructor at the London App Brewery, London's leading
              Programming Bootcamp. I've helped hundreds of thousands of
              students learn to code and change their lives by becoming a
              developer. I've been invited by companies such as Twitter,
              Facebook and Google to teach their employees. My first foray into
              programming was when I was just 12 years old, wanting to build my
              own Space Invader game. Since then, I've made hundred of websites,
              apps and games. But most importantly, I realised that my greatest
              passion is teaching. I spend most of my time researching how to
              make learning to code fun and make hard concepts easy to
              understand. I apply everything I discover into my bootcamp
              courses. In my courses, you'll find lots of geeky humour but also
              lots of explanations and animations to make sure everything is
              easy to understand. I'll be there for you every step of the way.
            </Typography>
          </Grid>
          <Grid item md={4}>
            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              {" "}
              <Avatar
                src="https://img-c.udemycdn.com/user/200_H/31334738_a13c_2.jpg"
                sx={{ width: 240, height: 240 }}
              />
            </div>
          </Grid>
        </Grid>

        <Typography
          css={css`
            margin-top: 2em;
            margin-bottom: 0.5em;
            font-weight: 700;
          `}
          variant="h5"
        >
          My Courses(6)
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

export default Profile;
