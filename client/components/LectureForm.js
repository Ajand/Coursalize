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

const LectureForm = ({
  lecture,
  setLecture,
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
          label="Name"
          fullWidth
          size="small"
          name="title"
          value={lecture.name}
          onChange={(e) => setLecture("name", e.target.value)}
          color="secondary"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Description"
          color="secondary"
          fullWidth
          size="small"
          name="description"
          value={lecture.description}
          onChange={(e) => setLecture("description", e.target.value)}
          multiline
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        {lecture.media ? (
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
                <Typography variant="body1">media:</Typography>
                <div>
                  <Button
                    color="secondary"
                    component="label"
                    onChange={(e) => setLecture("media", e.target.files[0])}
                  >
                    Change
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  <Button
                    onClick={(e) => setLecture("media", null)}
                    color="error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <video
                controls
                src={URL.createObjectURL(lecture.media)}
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
              onChange={(e) => setLecture("media", e.target.files[0])}
            >
              Select your lecture media
              <input
                hidden
                accept="video/mp4,video/x-m4v,video/*"
                type="file"
              />
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

export default LectureForm;
