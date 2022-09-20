/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Header from "../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import ProfileForm from "../../components/ProfileForm";

const CompleteProfile = () => {
  const [profile, setProfileInput] = useState({
    displayName: "",
    headline: "",
    bio: "",
    avatar: null,
  });

  const setProfile = (key, value) => {
    const nProfile = { ...profile };
    nProfile[key] = value;
    setProfileInput(nProfile);
  };

  const isDisabled = () => {
    const { displayName, headline, bio } = profile;
    if (displayName && headline && bio) return false;

    return true;
  };

  return (
    <div>
      <Header />
      <Container>
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid item md={6}>
            <Paper
              css={css`
                margin-top: 4em;
                padding: 2em;
              `}
            >
              <Typography
                variant="h6"
                css={css`
                  margin-bottom: 0.5em;
                `}
              >
                Complete Profile
              </Typography>
              <Divider
                css={css`
                  margin-bottom: 1em;
                `}
              />
              <ProfileForm
                profile={profile}
                setProfile={setProfile}
                isDisabled={isDisabled()}
                submitLabel="Complete Profile"
                onSubmit={() => {}}
              />
            </Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CompleteProfile;
