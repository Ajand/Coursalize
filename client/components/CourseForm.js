/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Button, Divider } from "@mui/material";

const CourseForm = () => {
  return (
    <div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField label="Title" fullWidth="true" size="small" name="title" />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Category"
          fullWidth="true"
          size="small"
          name="title"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Description"
          fullWidth="true"
          size="small"
          name="title"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField label="Price" fullWidth="true" size="small" name="title" />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <Button variant="outlined" color="secondary">
          Select A Cover for your course
        </Button>
      </div>
      <Divider
        css={css`
          margin-bottom: 0.75em;
        `}
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Button variant="contained" color="primary">
          Create The Course
        </Button>
      </div>
    </div>
  );
};

export default CourseForm;
