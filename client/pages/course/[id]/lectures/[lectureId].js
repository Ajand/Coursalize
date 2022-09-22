/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "../../../../components/Header";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../lib/DataProvider";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import LectureList from "../../../../components/LectureList";

const Lecture = () => {
  const router = useRouter();
  const { id, lectureId } = router.query;
  const { getLecture, tableland } = useContext(DataContext);

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [lectureInfo, setLectureInfo] = useState(null);

  const formatResult = (result) => {
    return result.rows.map((row, i) =>
      row.reduce((pV, cV, j) => {
        const nObj = { ...pV };
        nObj[result.columns[j].name] = cV;
        return nObj;
      }, {})
    );
  };

  useEffect(() => {
    const main = async () => {
      setLoadingInfo(true);
      const cInfo = await getLecture(lectureId);
      setLectureInfo(formatResult(cInfo)[0]);
      setLoadingInfo(false);
    };

    if (tableland && id) {
      main();
    }
  }, [tableland, id]);

  if (loadingInfo || !lectureInfo)
    return (
      <div>
        <Header />
        <Container>Loading Lecture...</Container>
      </div>
    );

  console.log(lectureInfo);

  return (
    <div>
      <Header />
      <Container
        css={css`
          padding-bottom: 5em;
        `}
      >
        <video
          css={css`
            width: 100%;
          `}
          src={`https://nftstorage.link/ipfs/${lectureInfo.media}`}
          controls
        />
        <Typography variant="h6">{lectureInfo.name}</Typography>
        <Typography variant="body1">{lectureInfo.description}</Typography>
        <LectureList courseId={id} hasAccess={true} />
      </Container>
    </div>
  );
};

export default Lecture;
