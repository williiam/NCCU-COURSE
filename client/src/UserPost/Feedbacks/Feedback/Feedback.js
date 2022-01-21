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
  Grow,
  Container,
  Grid,
  Icon,
} from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating";

import * as api from "../../../shared/utils/api/index.js";
import Slide from "@material-ui/core/Slide";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
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
import AlertDialog from "./AlertDialog/AlertDialog.js";
import { likePost, deletePost } from "../../../shared/redux/actions/posts";
import useStyles from "./styles";

const Feedback = ({ feedback, _expanded, _liked,refetch }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(feedback?.likes);
  const [expanded, setExpanded] = useState(_expanded);
  const [liked, setLiked] = useState(_liked);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [response, setResponse] = React.useState();
  const [deleteResponse, setDeleteResponse] = React.useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(_expanded);
    setLiked(_liked);
    if(deleteResponse){
      setOpenDelete(true);
      refetch();
    }
    return () => {};
  }, [_expanded, _liked,deleteResponse]);

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
        course: feedback.course_data.course,
        isLiked: false,
      });
      handleResponse(response);
    } else {
      const response = await api.updateLike({
        userId,
        course: feedback.course_data.course,
        isLiked: true,
      });
      handleResponse(response);
    }
  };

  const handleEdit = () => {
    history.push(`/editCourseFeedback/${feedback?.course_data.course}`)
  }

  const handleResponse = (response) => {
    //應該重新拿一次server的資料
    if (response.status === 201) {
      let new_dbdata = user?.dbdata;
      new_dbdata?.likes
        ? new_dbdata.likes.push(feedback.feedback)
        : (new_dbdata.likes = [feedback]);
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


  const handleLink = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/course/${feedback?.course_data.course}`);
  };

  const handleInfoLink = () =>{

    const course=feedback?.course_data

    const semester_code=course.semester;
    const year=course.semester.slice(0,3);
    const semester=course.semester.slice(3,4);
    const sixcode=course.code.slice(0,6);
    const twocode=course.code.slice(6,8);
    const onecode=course.code.slice(8,9);

    window.open(`https://newdoc.nccu.edu.tw/teaschm/${semester_code}/schmPrv.jsp-yy=${year}&smt=${semester}&num=${sixcode}&gop=${twocode}&s=${onecode}.html`);
  }

  const course_data = feedback?.course_data;

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDelete(false);
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">              
          <Paper className={classes.paper} elevation={6} style={{backGround:'gray'}}>
            <Grid
              container
              justify="space-around"
              alignItems="stretch"
              spacing={2}
              className={classes.gridContainer}
              style={{ padding: "10px 10px 0px 10px" ,backGroundColor:'gray'}}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="stretch"
                  spacing={2}
                  className={classes.gridContainer}
                >
                  <Grid item xs={12} sm={12} md={5} lg={4}>
                    <Card className={classes.root} variant="none">
                      <CardContent onClick={handleLink}>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {course_data.semester.toString().slice(0, 3) +
                            "/" +
                            "上"}{" "}
                          {bull} {course_data.sessionZH_TW}
                        </Typography>
                        <div className={classes.a}>
                          <Typography
                            variant="h5"
                            component="h2"
                            className={classes.title}
                          >
                            {course_data.courseNameZH_TW}
                          </Typography>
                        </div>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {course_data.instructorZH_TW} {bull}
                          {course_data.departmentZH_TW}
                        </Typography>
                        {/* <Typography variant="body3" component="p"></Typography> */}
                        
                      </CardContent>
                      <CardActions disableSpacing>
                        <div>
                          <IconButton aria-label="share">
                            <StarIcon
                              size="large"
                              style={{ fill: "#303F9F" }}
                            />
                            {course_data?.avg_rate === -1
                              ? ""
                              : course_data.avg_rate.toFixed(1)}
                          </IconButton>
                          <IconButton aria-label="share">
                            <PeopleAltIcon
                              size="large"
                              style={{ fill: "#303F9F" }}
                            />
                            {course_data?.num_of_feedback}
                          </IconButton>
                        </div>
                        <div className={classes.star}>
                          <IconButton aria-label="share" onClick={handleInfoLink}>
                            <InfoIcon />
                          </IconButton>
                          <IconButton
                            aria-label="add to favorites"
                            onClick={handleLike}
                          >
                            {liked ? (
                              <>
                                <FavoriteIcon style={{ fill: "#E29292" }} />
                              </>
                            ) : (
                              <>
                                <FavoriteBorderIcon
                                  style={{ fill: "#E29292" }}
                                />
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
                          科目代碼： {course_data.code}
                          <br></br>
                          學分數： {course_data.point}
                          <br></br>
                          上課教室： {course_data.classroom}
                          <br></br>
                          {course_data.note}
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={8}>
                    <Card className={classes.root} variant="none">
                      <CardContent>
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                          {" "}
                          {feedback.introduction}
                        </h4>
                        <p style={{ textAlign: "left" }}>
                          {feedback.description}
                        </p>
                      </CardContent>
                      <CardActions disableSpacing>
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <StarIcon
                              size="large"                              
                              style={{ fill: "#303F9F",color: "green" }}
                            />
                            <Typography
                              variant="h5"
                              component="h2"
                              className={classes.title}
                            >
                              {feedback?.rate === -1 ? "" : feedback.rate}
                            </Typography>
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Icon color="primary" size="small">
                              <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                  color: "black",
                                }}
                                className={classes.title}
                              >
                                甜：
                              </Typography>
                              {feedback.sweet}
                            </Icon>
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Icon color="primary" size="small">
                              <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                  color: "black",
                                }}
                                className={classes.title}
                              >
                                涼：
                              </Typography>
                              {feedback.loading}
                            </Icon>
                          </span>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "15px",
                            }}
                          >
                            <Icon color="primary" size="small">
                              <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                  color: "black",
                                }}
                                className={classes.title}
                              >
                                收穫：
                              </Typography>
                              {feedback.gain}
                            </Icon>
                          </span>
                          {/* {moment(feedback.createdAt).fromNow()} */}
                        </div>
                        <div className={classes.star}>
                          <IconButton
                            // className={clsx(classes.expand, {
                            //   [classes.expandOpen]: expanded,
                            // })}
                            onClick={()=>setOpenAlert(true)}
                            aria-expanded={expanded}
                            aria-label="show more"
                            size="large"
                          >
                            <DeleteForeverOutlinedIcon size="large"/>
                          </IconButton>
                          <IconButton
                            aria-label="add to favorites"
                            onClick={handleEdit}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Grow>
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
      <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openDelete}
          TransitionComponent={(props)=>(<Slide{...props} direction="up" />)}
          autoHideDuration={20000}
          onClose={handleCloseDelete}
          size="medium"
          message={deleteResponse?.status !== 201 ? "刪除評價失敗" : "刪除評價成功！"}
          // className={classes.snackbar}
        >
          {deleteResponse?.status !== 200 ? (
            <div>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseDelete} severity="warning" className={classes.snackbar}s>
              <span>刪除評價失敗</span>

            </MuiAlert>
            </div>
          ) : (
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseDelete} severity="success" className={classes.snackbar}>
               <span>刪除評價成功！</span>
              <Button variant="filled" size="small" className={classes.snackbarbtn} onClick={handleLink}>
                查看
            </Button>
            </MuiAlert>
          )}
        </Snackbar>
      <AlertDialog open={openAlert} setOpen={setOpenAlert} feedback={feedback} setDeleteResponse={setDeleteResponse}/>
    </>
  );
};

export default Feedback;
