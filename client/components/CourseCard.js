/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Avatar, Typography, Chip } from "@mui/material";
import { getCategoryName } from "../utils/courseCategories";
import { ethers } from "ethers";

const CourseCard = ({ course }) => {
  return (
    <Paper
      css={css`
        cursor: pointer;
        overflow: hidden;
      `}
    >
      <img
        src={course.cover}
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
            {ethers.utils.formatEther(course.price)} $MATIC
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
            {course.instructor.name}
          </Typography>
          <Avatar src={course.instructor.avatar} />
        </div>
      </div>
    </Paper>
  );
};

export default CourseCard;
