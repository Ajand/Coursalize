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
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { DataContext } from "../../lib/DataProvider";
import PlaceholderLoading from "react-placeholder-loading";

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

  const { address: userAddress } = useAccount();
  const router = useRouter();
  const { address } = router.query;
  const { getUserInfo, tableland } = useContext(DataContext);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
      const uInfo = await getUserInfo(address.toLowerCase());
      setUserInfo(formatResult(uInfo)[0]);
      setLoadingInfo(false);
    };

    if (tableland && address) {
      main();
    }
  }, [tableland, address]);

  const courses = Array(6)
    .fill(0)
    .map((c, i) => ({ ...course, id: i }));

  console.log(loadingInfo, userInfo);

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
            <div
              css={css`
                display: flex;
              `}
            >
              {loadingInfo || !userInfo.display_name ? (
                <>
                  <PlaceholderLoading shape="rect" width={300} height={36} />
                </>
              ) : (
                <Typography
                  css={css`
                    font-weight: 700;
                    margin-bottom: 0.1em;
                  `}
                  variant="h4"
                >
                  {userInfo.display_name}
                </Typography>
              )}
              {userAddress &&
                address &&
                userAddress.toLowerCase() === address.toLowerCase() && (
                  <Button
                    css={css`
                      margin-left: 16px;
                    `}
                    color="secondary"
                    size="small"
                    onClick={() => {
                      router.push("/profile/edit");
                    }}
                  >
                    Edit
                  </Button>
                )}
            </div>

            {loadingInfo || !userInfo.headline ? (
              <>
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={360} height={20} />
                </div>
              </>
            ) : (
              <Typography variant="h6">{userInfo.headline}</Typography>
            )}

            {loadingInfo || !userInfo.display_name ? (
              <>
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={80} height={32} />
                </div>
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
                </div>
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
                </div>{" "}
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
                </div>{" "}
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
                </div>{" "}
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
                </div>{" "}
                <div
                  css={css`
                    margin-top: 1em;
                  `}
                >
                  <PlaceholderLoading shape="rect" width={500} height={16} />
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
                  About me
                </Typography>
                <Typography variant="body1">{userInfo.bio}</Typography>
              </>
            )}
          </Grid>

          <Grid item md={4}>
            {loadingInfo || !userInfo.display_name ? (
              <>
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <PlaceholderLoading shape="circle" width={240} height={240} />
                </div>
              </>
            ) : (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <Avatar
                  src={`https://ipfs.io/ipfs/${userInfo.avatar}`}
                  sx={{ width: 240, height: 240 }}
                />
              </div>
            )}
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
