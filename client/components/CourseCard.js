/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Avatar, Typography, Chip } from "@mui/material";
import { getCategoryName } from "../utils/courseCategories";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { DataContext } from "../lib/DataProvider";
import { useContext, useEffect, useState } from "react";

const CourseCard = ({ course }) => {
  const router = useRouter();
  const { getUserInfo, tableland } = useContext(DataContext);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [instructorInfo, setInstructorInfo] = useState(null);

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
      const uInfo = await getUserInfo(course.instructor.toLowerCase());
      setInstructorInfo(formatResult(uInfo)[0]);
      setLoadingInfo(false);
    };

    if (tableland && course.instructor && course.instructor.toLowerCase) {
      main();
    }
  }, [tableland]);

  return (
    <Paper
      css={css`
        cursor: pointer;
        overflow: hidden;
      `}
      onClick={() => {
        router.push(`/course/${course.id}`);
      }}
    >
      <img
        src={`https://nftstorage.link/ipfs/${course.cover}`}
        css={css`
          width: 100%;
        `}
      />
      <div
        css={css`
          padding: 0.75em 1em;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5em;
          `}
        >
          <Chip
            color="primary"
            size="small"
            label={getCategoryName(course.category)}
            css={css`
              font-weight: 600;
            `}
          />
          <Typography
            css={(theme) =>
              css`
                color: ${theme.palette.secondary.main};
                font-weight: 600;
              `
            }
            variant="subtitle1"
          >
            {course.price} $MATIC
          </Typography>
        </div>
        <Typography
          variant="h6"
          css={css`
            font-weight: 700;
            font-size: 1.1em;
          `}
        >
          {course.title}
        </Typography>

        {instructorInfo && (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: end;
            `}
          >
            <Typography
              css={css`
                margin-right: 0.75em;
              `}
              variant="body2"
            >
              {instructorInfo.display_name}
            </Typography>
            <Avatar
              src={`https://nftstorage.link/ipfs/${instructorInfo.avatar}`}
            />
          </div>
        )}
      </div>
    </Paper>
  );
};

export default CourseCard;
