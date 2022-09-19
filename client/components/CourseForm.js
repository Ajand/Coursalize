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
  Typography,
} from "@mui/material";

import courseCategories from "../utils/courseCategories";

const CourseForm = ({
  course,
  setCourse,
  submitLabel,
  onSubmit,
  isDisabled,
}) => {
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
        <TextField
          label="Description"
          fullWidth
          size="small"
          name="description"
          value={course.description}
          onChange={(e) => setCourse("description", e.target.value)}
          multiline
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Price"
          fullWidth
          size="small"
          name="price"
          value={course.price}
          onChange={(e) => setCourse("price", e.target.value)}
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        {course.cover ? (
          <>
            <div
              css={css`
                margin-bottom: 0.75em;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 0.5em;
                `}
              >
                <Typography variant="body1">Cover:</Typography>
                <div>
                  <Button
                    color="secondary"
                    component="label"
                    onChange={(e) => setCourse("cover", e.target.files[0])}
                  >
                    Change
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  <Button
                    onClick={(e) => setCourse("cover", null)}
                    color="error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <img
                src={URL.createObjectURL(course.cover)}
                css={css`
                  width: 100%;
                `}
              />
            </div>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              component="label"
              onChange={(e) => setCourse("cover", e.target.files[0])}
            >
              Select A Cover for your course
              <input hidden accept="image/*" type="file" />
            </Button>
          </>
        )}
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
        <Button
          disabled={isDisabled}
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default CourseForm;
