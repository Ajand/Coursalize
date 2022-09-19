/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Avatar, Typography } from "@mui/material";
import { getCategoryName } from "../utils/courseCategories";
import { ethers } from "ethers";

const CourseCard = ({ course }) => {
  return (
    <Paper
      css={css`
        padding: 1em;
        cursor: pointer;
      `}
    >
      <img
        src={course.cover}
        css={css`
          width: 100%;
        `}
      />
      <Typography variant="h6">{course.title}</Typography>
      <Typography variant="subtitle2">
        {getCategoryName(course.category)}
      </Typography>
      <Typography variant="subtitle1">
        {ethers.utils.formatEther(course.price)} $MATIC
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
    </Paper>
  );
};

export default CourseCard;
