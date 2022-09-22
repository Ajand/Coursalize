/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import ProfileForm from "../../components/ProfileForm";
import { uploadFile } from "../../lib/web3StorageHelpers";
import { DataContext } from "../../lib/DataProvider";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const CompleteProfile = () => {
  const [profile, setProfileInput] = useState({
    displayName: "",
    headline: "",
    bio: "",
    avatar: null,
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const { coursesContract, courseUser } = useContext(DataContext);
  const { data: userData } = courseUser(address);

  useEffect(() => {
    console.log(userData)
    if (userData) {
      router.push(`/profile/${address}`);
    }
  }, [userData]);

  const setProfile = (key, value) => {
    const nProfile = { ...profile };
    nProfile[key] = value;
    setProfileInput(nProfile);
  };

  const isDisabled = () => {
    if (loading) return true;
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
                submitLabel={!loading ? "Complete Profile" : "Setting User"}
                onSubmit={async () => {
                  setLoading(true);

                  let avatarCid = "";
                  try {
                    if (profile.avatar) {
                      //avatarCid = await uploadFile(profile.avatar);
                    }

                    console.log(
                      profile.displayName,
                      profile.headline,
                      profile.bio,
                      avatarCid
                    );

                    const tx = await coursesContract.setUser(
                      profile.displayName,
                      profile.headline,
                      profile.bio,
                      avatarCid
                    );
                    await tx.wait();
                    setLoading(false);
                    router.push(`/profile/${address}`);
                  } catch (err) {
                    setLoading(false);
                    console.log(err);
                  }
                }}
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
