/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemButton,
} from "@mui/material";
import { DataContext } from "../lib/DataProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const LectureList = ({ courseId, hasAccess }) => {
  const { getCourseLectures, tableland } = useContext(DataContext);
  const router = useRouter();

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [lectures, setLectureInfo] = useState(null);

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
      const lInfo = await getCourseLectures(courseId);
      setLectureInfo(formatResult(lInfo));
      setLoadingInfo(false);
    };

    if (tableland && courseId) {
      main();
    }
  }, [tableland, courseId]);

  return (
    <Paper
      css={css`
        margin-top: 1em;
      `}
    >
      {loadingInfo || !lectures ? (
        <div
          css={css`
            padding: 2em;
          `}
        >
          Loading Lectures data
        </div>
      ) : (
        <List>
          {lectures.length > 0 ? (
            lectures.map((lecture) => (
              <ListItem
                button={hasAccess}
                onClick={() => {
                  if (hasAccess) {
                    router.push(`/course/${courseId}/lectures/${lecture.id}`);
                  }
                }}
                key={lecture.id}
              >
                <ListItemText
                  primary={lecture.name}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No lecture yet." />
            </ListItem>
          )}
        </List>
      )}
    </Paper>
  );
};

export default LectureList;
