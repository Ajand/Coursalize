/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Paper, Avatar, Typography } from "@mui/material";

const CourseCard = () => {
  return (
    <Paper
      css={css`
        padding: 1em;
        cursor: pointer;
      `}
    >
      <img
        src="https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg"
        css={css`
          width: 100%;
        `}
      />
      <Typography variant="h6">Very important course</Typography>
      <Typography variant="subtitle2">Development</Typography>
      <Typography variant="subtitle1">500 $MATIC</Typography>
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
          Dr. Angela Yu
        </Typography>
        <Avatar src="https://img-c.udemycdn.com/user/200_H/31334738_a13c_2.jpg" />
      </div>
    </Paper>
  );
};

export default CourseCard;
