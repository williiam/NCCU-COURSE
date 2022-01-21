import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Paper,
  IconButton,
  Collapse,
  Snackbar,
  Divider,
} from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

import * as api from "../../../shared/utils/api/index.js";
import Slide from "@material-ui/core/Slide";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch } from "react-redux";
import moment from "moment";
import { AUTH } from "../../../shared/constants/actionTypes";
import { useHistory } from "react-router-dom";
import ShareIcon from "@material-ui/icons/Share";
import InfoIcon from "@material-ui/icons/Info";
import StarIcon from "@material-ui/icons/Star";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import { likePost, deletePost } from "../../../shared/redux/actions/posts";
import useStyles from "./styles";

const Course = ({ course, _expanded, _liked }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(course?.likes);
  const [expanded, setExpanded] = useState(_expanded);
  const [liked, setLiked] = useState(_liked);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(_expanded);
    setLiked(_liked);
    return () => {};
  }, [_expanded, _liked]);

  const userId = user?.result.googleId || user?.result?._id;
  //   const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    if (!user) {
      // setOpen(true);
      setOpen(true);
      return;
    }

    if (liked) {
      const response = await api.updateLike({
        userId,
        course: course.course,
        isLiked: false,
      });
      handleResponse(response);
    } else {
      const response = await api.updateLike({
        userId,
        course: course.course,
        isLiked: true,
      });
      handleResponse(response);
    }
  };

  const handleResponse = (response) => {
    //應該重新拿一次server的資料
    if (response.status === 201) {
      let new_dbdata = user?.dbdata;
      new_dbdata?.likes
        ? new_dbdata.likes.push(course.course)
        : (new_dbdata.likes = [course]);
      //顯示更新成功
      dispatch({ type: AUTH, data: { ...user, dbdata: response.data } });
      if (liked) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    } else {
      //顯示更新失敗
    }
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

  const handleInfoLink = () => {
    const semester_code = course.semester;
    const year = course.semester.slice(0, 3);
    const semester = course.semester.slice(3, 4);
    const sixcode = course.code.slice(0, 6);
    const twocode = course.code.slice(6, 8);
    const onecode = course.code.slice(8, 9);

    window.open(
      `https://newdoc.nccu.edu.tw/teaschm/${semester_code}/schmPrv.jsp-yy=${year}&smt=${semester}&num=${sixcode}&gop=${twocode}&s=${onecode}.html`
    );
  };

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent onClick={handleLink}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {course.semester.toString().slice(0, 3) + "/"}
            {course.semester.toString().slice(3, 4) === "1" ? "上" : "下"}
            {bull} {course.sessionZH_TW}
          </Typography>
          <div className={classes.a}>
            <Typography variant="h5" component="h2" className={classes.title}>
              {course.courseNameZH_TW}
            </Typography>
          </div>
          <Typography className={classes.pos} color="textSecondary">
            {course.instructorZH_TW} {bull}
            {course.departmentZH_TW}
          </Typography>
          {/* <Typography variant="body3" component="p"></Typography> */}
        </CardContent>
        <CardActions disableSpacing>
          <div>
            <IconButton aria-label="share">
              <StarIcon size="large" style={{ fill: "orange" }} />
              {course?.avg_rate === -1 ? "0" : course.avg_rate.toFixed(1)}
            </IconButton>
            <IconButton aria-label="share">
              <PeopleAltIcon size="large" style={{ fill: "#303F9F" }} />
              {course?.num_of_feedback}
            </IconButton>
          </div>
          <div className={classes.star}>
            <IconButton aria-label="share" onClick={handleInfoLink}>
              <InfoIcon />
            </IconButton>
            <IconButton aria-label="add to favorites" onClick={handleLike}>
              {liked ? (
                <>
                  <FavoriteIcon style={{ fill: "#E29292" }} />
                </>
              ) : (
                <>
                  <FavoriteBorderIcon style={{ fill: "#E29292" }} />
                </>
              )}
            </IconButton>
            <IconButton
              // className={clsx(classes.expand, {
              //   [classes.expandOpen]: expanded,
              // })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6" className={classes.lightText}>
              學分數：{course.point}
            </Typography>
            <Divider></Divider>
            <br></br>
            {/* 教師姓名：{course.instructorZH_TW}
                      <br></br> */}
            <Typography variant="h6" className={classes.lightText}>
              科目代碼：{course.code}
            </Typography>
            {/* <br></br> */}
            <Divider></Divider>
            <br></br>
            {/* 上課時間：{course.sessionZH_TW}
                      <br></br>
                      開課單位：{course.departmentZH_TW}
                    <br></br> */}
            <Typography variant="h6" className={classes.lightText}>
              上課教室：{course.classroom}
            </Typography>

            <Divider></Divider>
            <p className={classes.lightText}>{course.note}</p>
          </CardContent>
        </Collapse>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        onClose={handleClose}
        message="請登入後再加入收藏"
        key={"topcenter"}
      >
        <MuiAlert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          請登入後再加入收藏
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Course;
