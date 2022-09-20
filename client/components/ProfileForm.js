/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Button, Divider, Avatar, Typography } from "@mui/material";

import courseCategories from "../utils/courseCategories";

const ProfileForm = ({
  profile,
  setProfile,
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
          label="Display Name"
          fullWidth
          size="small"
          name="displayName"
          value={profile.displayName}
          onChange={(e) => setProfile("displayName", e.target.value)}
          color="secondary"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Headline"
          fullWidth
          size="small"
          name="headline"
          value={profile.headline}
          onChange={(e) => setProfile("headline", e.target.value)}
          color="secondary"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        <TextField
          label="Bio"
          fullWidth
          multiline
          size="small"
          name="bio"
          value={profile.bio}
          onChange={(e) => setProfile("bio", e.target.value)}
          color="secondary"
        />
      </div>
      <div
        css={css`
          margin-bottom: 0.75em;
        `}
      >
        {profile.avatar ? (
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
                <Typography variant="body1">Avatar:</Typography>
                <div>
                  <Button
                    color="secondary"
                    component="label"
                    onChange={(e) => setProfile("avatar", e.target.files[0])}
                  >
                    Change
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  <Button
                    onClick={(e) => setProfile("avatar", null)}
                    color="error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <Avatar
                src={URL.createObjectURL(profile.avatar)}
                sx={{ width: 240, height: 240 }}
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
              onChange={(e) => setProfile("avatar", e.target.files[0])}
            >
              Select an avatar for yourself
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

export default ProfileForm;
