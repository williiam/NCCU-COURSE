import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Paper
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { likePost, deletePost } from "../../../shared/redux/actions/posts";
import useStyles from "./styles";

const Course = ({ course, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(course?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  //   const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    // dispatch(likePost(post._id));
    // if (hasLikedPost) {
    //   setLikes(post.likes.filter((id) => id !== userId));
    // } else {
    //   setLikes([...post.likes, userId]);
    // }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <FavoriteIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize="small" />
        &nbsp;
      </>
    );
  };

  const handleLink = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/course/${course.course}`);
  };

  return (
    <Card className={classes.card} raised elevation={6} onClick={handleLink}>
       {/* <Paper className={classes.paper} elevation={6}> */}
        <Typography variant="h6">
        {course.courseNameZH_TW}
          </Typography>

        學年期:{course.semester.toString().slice(0, 3) + "/" + "上"}
        <br></br>
        科目代碼:{course.course}
        <br></br>
        科目名稱:{course.courseNameZH_TW}
        <br></br>
        教師姓名:{course.instructorZH_TW}
        <br></br>
        學分數：{course.point}
        <br></br>
        上課時間:{course.sessionZH_TW}
        <br></br>
        開課單位：{course.departmentZH_TW}
        <br></br>
        上課教室:{course.classroom}
        <br></br>
        備註:{course.note}
      {/* </Paper> */}
    </Card>
  );
};

export default Course;
