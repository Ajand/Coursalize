/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import courseCategories from "../utils/courseCategories";

const CourseForm = ({ course, setCourse }) => {
  return (
    <div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Title"
          fullWidth
          size="small"
          name="title"
          value={course.title}
          onChange={(e) => setCourse("title", e.target.value)}
        />
      </div>
      <FormControl
        fullWidth
        size="small"
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={course.category}
          label="Category"
          onChange={(e) => setCourse("category", e.target.value)}
        >
          {courseCategories.map((category) => (
            <MenuItem value={category.value} key={category.value}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField label="Description" fullWidth size="small" name="title" />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField label="Price" fullWidth size="small" name="title" />
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
