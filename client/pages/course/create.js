/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useContext } from "react";
import Header from "../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import CourseForm from "../../components/CourseForm";
import { DataContext } from "../../lib/DataProvider";
import { uploadFile } from "../../lib/web3StorageHelpers";
import { useRouter } from "next/router";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);

  const { coursesContract, courseIds } = useContext(DataContext);

  const cci = courseIds();

  const router = useRouter();

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

  const isDisabled = () => {
    if (loading) return true;
    const { title, category, price, description } = course;
    if (title && !isNaN(category) && !isNaN(price) && description) return false;
    return true;
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
              <CourseForm
                course={course}
                setCourse={setCourse}
                isDisabled={isDisabled()}
                submitLabel={
                  !loading ? "Create The Course" : "Creating the course"
                }
                onSubmit={async () => {
                  const nextIds = cci.data.toString();
                  setLoading(true);

                  let coverCid = "";
                  try {
                    if (course.cover) {
                      coverCid = await uploadFile(course.cover);
                    }
                    console.log(
                      course.title,
                      course.category,
                      course.description,
                      coverCid,
                      Number(course.price)
                    );

                    const tx = await coursesContract.createCourse(
                      course.title,
                      course.category,
                      course.description,
                      coverCid,
                      Number(course.price)
                    );
                    await tx.wait();
                    router.push(`/course/${nextIds}`);
                    setLoading(false);
                  } catch (err) {
                    setLoading(false);
                    console.log(err);
                  }
                }}
              />
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
