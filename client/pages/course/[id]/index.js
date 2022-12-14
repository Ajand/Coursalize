/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../../../components/Header";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/router";
import { DataContext } from "../../../lib/DataProvider";
import { useAccount } from "wagmi";
import { getCategoryName } from "../../../utils/courseCategories";
import LectureList from "../../../components/LectureList";
import TextResolver from "../../../components/TextResolver";

const Course = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getCourseInfo, tableland, coursesContract } = useContext(DataContext);

  const { address: userAddress } = useAccount();

  const [buyLoading, setBuyLoading] = useState(false);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);

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
      try {
        const cInfo = await getCourseInfo(id);
        setCourseInfo(formatResult(cInfo)[0]);
      } catch (err) {
        console.log(err);
      }
      setLoadingInfo(false);
    };

    if (tableland && id) {
      main();
    }
  }, [tableland, id]);

  return (
    <div>
      <Header />
      <Container
        css={css`
          margin-top: 2em;
          margin-bottom: 5em;
        `}
      >
        <Grid container spacing={4}>
          <Grid item md={8}>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              {loadingInfo || !courseInfo ? (
                <div
                  css={css`
                    width: 50%;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "2.5rem" }} />
                </div>
              ) : (
                <Typography
                  css={css`
                    font-weight: 700;
                    margin-bottom: 0.1em;
                  `}
                  variant="h4"
                >
                  {courseInfo.title}
                </Typography>
              )}
              {userAddress &&
              courseInfo &&
              courseInfo.instructor.toLowerCase() ===
                userAddress.toLowerCase() ? (
                <Button
                  css={css`
                    margin-left: 16px;
                  `}
                  color="secondary"
                  size="small"
                  onClick={() => {
                    router.push(`/course/${id}/edit`);
                  }}
                >
                  Edit Course
                </Button>
              ) : (
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <Typography
                    variant="h6"
                    css={(theme) =>
                      css`
                        color: ${theme.palette.secondary.main};
                        margin-left: 16px;
                      `
                    }
                  >
                    {courseInfo?.price} $MATIC
                  </Typography>

                  <Button
                    css={css`
                      margin-left: 16px;
                    `}
                    color="primary"
                    variant="contained"
                    size="small"
                    disabled={buyLoading}
                    onClick={async () => {
                      try {
                        setBuyLoading(true);
                        const tx = await coursesContract.mintCourse(id, {
                          value: courseInfo?.price,
                        });
                        await tx.wait();
                        setBuyLoading(false);
                        router.push(`/course/${id}`);
                      } catch (err) {
                        setBuyLoading(false);
                        console.log(err);
                      }
                    }}
                  >
                    {buyLoading ? "Buying The Course" : "Buy The Course"}
                  </Button>
                </div>
              )}
            </div>

            {loadingInfo || !courseInfo ? (
              <>
                <div
                  css={css`
                    width: 70%;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                </div>
              </>
            ) : (
              <Typography variant="h6">
                {getCategoryName(Number(courseInfo.category))}
              </Typography>
            )}

            {loadingInfo || !courseInfo ? (
              <>
                <div
                  css={css`
                    width: 20%;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} />
                </div>
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>{" "}
                <div
                  css={css`
                    width: 100%;
                    margin-bottom: 10;
                  `}
                >
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </div>
              </>
            ) : (
              <>
                <Typography
                  css={css`
                    margin-top: 1em;
                    font-size: 1.5em;
                    font-weight: 600;
                    margin-bottom: 0.25em;
                  `}
                  variant="h5"
                >
                  Description
                </Typography>
                <Typography variant="body1">
                  <TextResolver cid={courseInfo.description} />
                </Typography>
              </>
            )}
          </Grid>

          <Grid item md={4}>
            {loadingInfo || !courseInfo ? (
              <>
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Skeleton variant="rectangle" width={"100%"} height={240} />
                </div>
              </>
            ) : (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <img
                  src={`https://nftstorage.link/ipfs/${courseInfo.cover}`}
                  css={css`
                    width: 100%;
                  `}
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 2em;
              `}
            >
              <Typography
                css={css`
                  font-size: 1.5em;
                  font-weight: 600;
                  margin-bottom: 0.25em;
                `}
                variant="h5"
              >
                Lectures
              </Typography>
              <div>
                {userAddress &&
                  courseInfo &&
                  courseInfo.instructor.toLowerCase() ===
                    userAddress.toLowerCase() && (
                    <Button
                      onClick={() => router.push(`/course/${id}/add-lecture`)}
                      variant="contained"
                      size="small"
                    >
                      Add Lecture
                    </Button>
                  )}
              </div>
            </div>
            <LectureList courseId={id} hasAccess={true} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Course;
