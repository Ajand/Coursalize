/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useContext, useEffect } from "react";
import Header from "../../../components/Header";
import { Container, Grid, Paper, Typography, Divider } from "@mui/material";
import LectureForm from "../../../components/LectureForm";
import { uploadFile, upload } from "../../../lib/web3StorageHelpers";
import { DataContext } from "../../../lib/DataProvider";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const AddLecture = () => {
  const [lecture, setLectureInput] = useState({
    name: "",
    description: "",
    public: false,
    media: null,
  });
  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const { coursesContract, generateUploadUrl } = useContext(DataContext);

  const setLecture = (key, value) => {
    const nProfile = { ...lecture };
    nProfile[key] = value;
    setLectureInput(nProfile);
  };

  const isDisabled = () => {
    if (loading) return true;
    const { name, description, media } = lecture;
    if (name && description && media) return false;
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
                Adding Lecture
              </Typography>
              <Divider
                css={css`
                  margin-bottom: 1em;
                `}
              />
              <LectureForm
                lecture={lecture}
                setLecture={setLecture}
                isDisabled={isDisabled()}
                submitLabel={!loading ? "Add Lecture" : "Adding Lecture"}
                onSubmit={async () => {
                  setLoading(true);

                  let mediaCid = "";

                  try {
                    if (lecture.media) {
                      mediaCid = await uploadFile(lecture.media);
                    }

                    const descriptionCid = await upload(lecture.description);

                    const tx = await coursesContract.addLecture(
                      id,
                      lecture.name,
                      descriptionCid,
                      mediaCid
                    );
                    await tx.wait();
                    setLoading(false);
                    router.push(`/course/${id}`);
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

export default AddLecture;
