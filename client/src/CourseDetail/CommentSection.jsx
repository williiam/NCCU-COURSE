import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import { useDispatch } from "react-redux";
import * as api from "../shared/utils/api/index.js";
import { commentPost } from "../shared/redux/actions/posts";
import useStyles from "./styles";

const CommentSection = ({ course, course_id }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(course?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  useEffect(() => {
    setComments(course?.comments);
  }, [course]);

  const handleComment = async () => {
    // const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
    const value = `${
      (user?.dbdata?.nickname ? (user?.dbdata?.nickname=="NOT_SET"?"匿名":user?.dbdata?.nickname) : "匿名")
    }: ${comment}`;
    const newComments = await api.createCourseComment(
      { value, id: course_id },
      course_id
    );

    setComment("");
    setComments(newComments.data.comments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={1}
          // className={classes.gridContainer}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography gutterBottom variant="h6">
              留言板
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              {comments?.map((c, i) => (
                <Typography
                  key={i}
                  gutterBottom
                  variant="subtitle1"
                  style={{ textAlign: "left", whiteSpace: "pre-line" }}
                >
                  <strong>{c.split(": ")[0]}</strong>
                  {c.split(":")[1]}
                </Typography>
              ))}
            </div>
            <div ref={commentsRef} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {/* <div style={{ width: "70%" }}> */}
            <div>
              {/* <Typography gutterBottom variant="h6">留言</Typography> */}
              {/* <Typography variant="h6">使用暱稱：{user?.dbdata?.nickname?user?.dbdata?.nickname:"匿名"}</Typography> */}
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="輸入留言"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2px"
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  disabled
                  label={
                    "使用暱稱：" +
                    (user?.dbdata?.nickname ? (user?.dbdata?.nickname=="NOT_SET"?"匿名":user?.dbdata?.nickname) : "匿名")
                  }
                />
              </div>
              <Button
                // style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment.length}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                留言
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CommentSection;
