import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grow,
  Container,
  Grid,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Hidden,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Snackbar,
  Slide,
  Card,
  SvgIcon,
} from "@material-ui/core/";

import MuiAlert from "@material-ui/lab/Alert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InfoIcon from "@material-ui/icons/Info";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { AUTH } from "../shared/constants/actionTypes";

import Rating from "@material-ui/lab/Rating";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import * as api from "../shared/utils/api/index.js";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "./randomBigHead";

import Footer from "../shared/components/Footer/Footer.js";
import CommentSection from "./CommentSection";
import useStyles from "./styles";

const CourseDetail = () => {
  const [value, setValue] = React.useState(4.5);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [course, setCourse] = React.useState();
  const [feedback, setFeedback] = React.useState();
  const [resources, setResources] = React.useState();
  const [expanded, setExpanded] = React.useState(true);
  const [semester, setSemester] = React.useState("1101");
  const [open, setOpen] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;

  const userLikes = user?.dbdata?.likes ? user.dbdata.likes : [];
  const params = useParams();
  const course_id = params.course_id;
  const [liked, setLiked] = React.useState(
    userLikes.includes(course_id) ? true : false
  );

  useEffect(() => {
    const course_id = params.course_id;
    if (course_id) {
      getCourse(course_id);
      getResource();
    }
  }, []);

  const getCourse = async (course_id) => {
    if (checkRequiredField(course_id)) {
      const { data } = await api.fetchCourseDetail({ course_id });
      setCourse(data.course);
      setFeedback(data.feedback);
      // setLiked(data.feedback)
    } else {
    }
  };

  const checkRequiredField = (course_id) => {
    //目前資料庫course欄位資料格式不一至（１．不是string而是int 所以0開頭的代碼的0被吃掉了）改用regex
    if (course_id.length === 13) {
      return true;
    }
    return true;
  };

  const handleEditClick = () => {
    if (!user) {
      // setOpen(true);
      setOpen(true);
      return;
    }

    handleEditFeedback();
  };

  const handleEditFeedback = async () => {
    const response = await api.checkUserFeedback({
      userId,
      courseId: course_id,
    });
    console.log(response);
    if (response.status !== 200) {
      return;
    }
    console.log("userId", userId);
    if (response.data.feedback !== null) {
      history.push(`/editCourseFeedback/${course.course}`);
    } else {
      history.push(`/createCourseFeedback/${course.course}`);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    // getResource();
    setExpanded(isExpanded ? panel : false);
  };

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

  const getResource = async () => {
    if (checkRequiredField(course_id)) {
      const { data } = await api.fetchCourseResource({ course_id });
      setResources(data.resource);
      console.log(data);
    } else {
    }
  };

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  const [openSemester, setOpenSemester] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handle1101 = (event) => {
    handleClose(event);
    setSemester("1101");
    const new_course_id = semester + params.course_id.slice(4, 14);
    history.push(`/course/${new_course_id}`);
  };

  const handle1102 = (event) => {
    handleClose(event);
    setSemester("1102");
    const new_course_id = semester + params.course_id.slice(4, 14);
    history.push(`/course/${new_course_id}`);
  };

  const handleDepartmentLink = (event, reason) => {
    const new_course_id = semester + params.course_id.slice(4, 14);

    history.push(`/department/${course.department}`);
  };

  const handleProfessorLink = (event, reason) => {
    history.push(`/instructor/${course.instructor}`);
  };

  const handleToggle = () => {
    setOpenSemester((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSemester(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSemester(false);
    }
  }

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  console.log(resources);
  const clear = () => {};
  return (
    <>
      <Grow in>
        <Container maxWidth="xl" className={classes.gridContainer}>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={12} md={12}>
              {course ? (
                <Paper
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  elevation={6}
                >
                  <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={2}
                    className={classes.gridContainer}
                  >
                    <Grid item xs={12} sm={7} md={9}>
                      {/* <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {course.semester.toString().slice(0, 3) + "/"}
                      {(course.semester.toString().slice(3, 4)==="1"?"上":"下")}
                      
                      {" "}
                      {bull} {course.sessionZH_TW}
                    </Typography> */}
                      <div>
                        <Button
                          ref={anchorRef}
                          variant="outlined"
                          aria-controls={
                            openSemester ? "menu-list-grow" : undefined
                          }
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          <Typography
                            color="textPrimary"
                            className={classes.btnText}
                          >
                            {getChineseName(semester)}
                          </Typography>
                        </Button>
                        <Popper
                          open={openSemester}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={openSemester}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <MenuItem onClick={handle1101}>
                                      110/上
                                    </MenuItem>
                                    <MenuItem onClick={handle1102} disabled>
                                      110/下
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        {bull}
                        <Typography
                          variant="h6"
                          style={{ display: "inline-block" }}
                        >
                          {course.sessionZH_TW}
                        </Typography>
                      </div>
                    </Grid>
                    <Hidden xsDown>
                      <Grid item xs={12} sm={5} md={3}>
                        <div className={classes.star}>
                          <IconButton
                            aria-label="share"
                            onClick={handleInfoLink}
                          >
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
                            onClick={handleEditClick}
                            aria-label="show more"
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        </div>
                      </Grid>
                    </Hidden>
                  </Grid>

                  <Typography
                    variant="h3"
                    className={classes.headerText}
                    gutterBottom
                  >
                    {course.courseNameZH_TW}
                  </Typography>
                  <Typography variant="h5">
                    <span
                      onClick={handleProfessorLink}
                      style={{
                        color: "#576ee0",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {course.instructorZH_TW}
                    </span>
                    {bull}
                    <span
                      onClick={handleDepartmentLink}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {course.departmentZH_TW}
                    </span>
                  </Typography>
                </Paper>
              ) : (
                <></>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              style={{ padding: "8px", borderRadius: "15px" }}
            >
              <Paper
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  backgroundColor: "white",
                }}
                elevation={6}
              >
                <Box>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: "8px", borderRadius: "15px" }}
                  >
                    {course ? (
                      <>
                        {/* <Typography variant="h6">{"詳細資訊"}</Typography> */}
                        {/* 學年期：
                      {course.semester.toString().slice(0, 3) + "/" + "上"} */}
                        <br></br>

                        <Typography variant="h6" className={classes.lightText}>
                          學分數：{course.point}
                        </Typography>
                        <br></br>

                        <Typography variant="h6" className={classes.lightText}>
                          科目代碼：{course.code}
                        </Typography>

                        <br></br>

                        <Typography variant="h6" className={classes.lightText}>
                          上課教室：{course.classroom}
                        </Typography>
                        <br></br>

                        <Accordion style={{ boxShadow: "transparent" }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ boxShadow: "transparent" }}
                          >
                            <Typography
                              variant="h6"
                              className={classes.lightText}
                            >
                              備註
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              <p className={classes.lightText}>{course.note}</p>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Hidden smUp>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                style={{ padding: "8px", borderRadius: "15px" }}
              >
                <Paper
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  elevation={6}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    className={classes.gridContainer}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <div style={{ margin: "0 auto", width: "100%" }}>
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
                              <FavoriteBorderIcon style={{ fill: "#E29292" }} />
                            </>
                          )}
                        </IconButton>
                        <IconButton
                          // className={clsx(classes.expand, {
                          //   [classes.expandOpen]: expanded,
                          // })}
                          onClick={handleEditFeedback}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Hidden>
            <Grid
              item
              xs={12}
              sm={8}
              md={9}
              style={{ padding: "8px", borderRadius: "15px" }}
            >
              <Paper
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  backgroundColor: "white",
                }}
                elevation={6}
              >
                {/* <Typography variant="h6">{course.courseNameZH_TW}</Typography> */}
                <Box>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={2}
                    className={classes.gridContainer}
                  >
                    <Grid item xs={11} sm={11} md={11}>
                      <Typography variant="h5" component="h5">
                        {"課程總評價"}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={1} sm={1} md={1}>
                    <FavoriteBorderIcon size="large" color="red" />
                  </Grid> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.starContainer}
                  >
                    <Rating
                      size="large"
                      name="simple-controlled"
                      value={
                        parseFloat(course?.avg_rate.toFixed(1)) === -1
                          ? 0
                          : parseFloat(course?.avg_rate.toFixed(1))
                      }
                      precision={0.1}
                      className={classes.starContainer}
                      readOnly
                      style={{
                        paddingTop: "20px",
                        borderRadius: "15px",
                        fontsize: "30px",
                      }}
                      onChange={(event, newValue) => {
                        // setFeedBackData({ ...feedBackData, rate: newValue });
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="h5"
                      style={{
                        paddingTop: "20px",
                        borderRadius: "15px",
                        fontsize: "30px",
                        color: "orange",
                      }}
                    >
                      {course?.avg_rate.toFixed(1) == -1
                        ? "N/A"
                        : course?.avg_rate.toFixed(1)}
                    </Typography>
                  </Grid>
                  <Divider className={classes.divider} />

                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      variant="h6"
                      component="h4"
                      className={classes.mediumText}
                    >
                      評價人數：{course?.num_of_feedback}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h6" component="h4">
                    被收藏數：{course?.favoriteCount}
                  </Typography>
                </Grid> */}
                  <Divider className={classes.divider} />
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="stretch"
                      spacing={2}
                      className={classes.gridContainer}
                    >
                      <Grid item xs={4} sm={4} md={4}>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.heavyText}
                        >
                          {"甜度"}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.number}
                        >
                          {course?.avg_sweet?.toFixed(1) == -1
                            ? "N/A"
                            : course?.avg_sweet?.toFixed(1)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4}>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.heavyText}
                        >
                          {"涼度"}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.number}
                        >
                          {course?.avg_loading?.toFixed(1) == -1
                            ? "N/A"
                            : course?.avg_loading?.toFixed(1)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4}>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.heavyText}
                        >
                          {"收穫"}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="h4"
                          className={classes.number}
                        >
                          {course?.avg_gain?.toFixed(1) == -1
                            ? "N/A"
                            : course?.avg_gain?.toFixed(1)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={1}
              className={classes.gridContainer}
              xs={12}
              sm={12}
              md={12}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                style={{ padding: "8px 5px 8px 5px", borderRadius: "15px" }}
              >
                <Paper
                  style={{
                    padding: "20px 5px 20px 5px",
                    borderRadius: "15px",
                    backgroundColor: "#F7F8FC",
                  }}
                  elevation={6}
                >
                  <Box>
                    {/* <Typography
                    variant="h4"
                    component="h4"
                    style={{ marginBottom: "15px" }}
                  >
                    {"課程評價"}
                  </Typography> */}
                    <Grid
                      container
                      justify="space-around"
                      alignItems="stretch"
                      className={classes.gridContainer}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      {feedback?.length == 0 ? (
                        <>
                          <Grid item xs={12} sm={12} md={12}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="h6"
                                component="h6"
                                style={{ textAlign: "left", color: "gray" }}
                              >
                                尚無評價
                              </Typography>
                            </div>
                          </Grid>
                        </>
                      ) : (
                        <>
                          {feedback?.map(function (feedback) {
                            return (
                              <Grid item xs={12} sm={12} md={12}>
                                <Card
                                  gutterBottom
                                  variant="outlined"
                                  className={classes.feedback}
                                >
                                  <Grid container wrap="nowrap" spacing={1}>
                                    <Grid item>
                                      <SvgIcon
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                        }}
                                        width="50px"
                                        height="50px"
                                      >
                                        <BigHead {...getRandomOptions()} />
                                      </SvgIcon>
                                    </Grid>
                                    <Grid
                                      justifyContent="left"
                                      item
                                      xs
                                      zeroMinWidth
                                    >
                                      <h4
                                        style={{
                                          margin: 0,
                                          textAlign: "left",
                                          lineHeight: 2.8,
                                        }}
                                        className={classes.mediumText}
                                      >
                                        {" "}
                                        {feedback.introduction}
                                      </h4>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={0}>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      style={{
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          textAlign: "left",
                                          whiteSpace: "pre-line",
                                          marginTop: "5px",
                                        }}
                                        className={classes.lightText}
                                      >
                                        {feedback.description}
                                      </p>
                                      <p
                                        style={{ textAlign: "", color: "gray" }}
                                      >
                                        <Rating
                                          size="small"
                                          name="simple-controlled"
                                          value={feedback.rate}
                                          precision={0.5}
                                          className={classes.stars}
                                          readOnly
                                          onChange={(event, newValue) => {
                                            // setFeedBackData({ ...feedBackData, rate: newValue });
                                          }}
                                        />
                                        / {moment(feedback.createdAt).fromNow()}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Card>
                              </Grid>
                            );
                          })}
                        </>
                      )}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={1}
              className={classes.gridContainer}
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                borderRadius: "15px",
                fontsize: "30px",
              }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Accordion
                  style={{ padding: "20px", borderRadius: "15px" }}
                  style={{
                    padding: "20px 5px 20px 5px",
                    borderRadius: "15px",
                    backgroundColor: "#F7F8FC",
                  }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h6"
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        課程資源分享
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      justify="space-between"
                      alignItems="stretch"
                      spacing={3}
                      className={classes.gridContainer}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      {resources?.length == 0 ? (
                        <>
                          <Grid item xs={12} sm={12} md={12}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="p"
                                component="p"
                                style={{ textAlign: "left", color: "gray" }}
                              >
                                尚無資源
                              </Typography>
                            </div>
                          </Grid>
                        </>
                      ) : (
                        <>
                          {resources?.map(function (resource) {
                            return (
                              <Grid item xs={12} sm={12} md={12}>
                                <Paper
                                  gutterBottom
                                  variant="outlined"
                                  elevation={3}
                                  style={{
                                    padding: "10px 10px",
                                    backgroundColor: "#f7f1e8",
                                  }}
                                >
                                  <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                      <div
                                        style={{
                                          marginTop: "12px",
                                        }}
                                      >
                                        <AttachFileIcon />
                                      </div>
                                    </Grid>
                                    <Grid
                                      justifyContent="left"
                                      item
                                      xs
                                      zeroMinWidth
                                    >
                                      <h4
                                        style={{
                                          margin: 0,
                                          textAlign: "left",
                                          lineHeight: 2.8,
                                        }}
                                        className={classes.mediumText}
                                      >
                                        {" "}
                                        {resource.introduction}
                                      </h4>
                                      {/* <p style={{ textAlign: "left" }}>
                                    {resource.description}
                                  </p> */}
                                      {resource.file === "" ? (
                                        ""
                                      ) : (
                                        <>
                                          <a href={resource?.file} download>
                                            {resource.file_name}
                                          </a>
                                          <br></br>
                                        </>
                                      )}

                                      <p
                                        style={{ textAlign: "", color: "gray" }}
                                      >
                                        {resource?.user_nickname} /{" "}
                                        {moment(resource.createdAt).fromNow()}
                                      </p>
                                    </Grid>
                                  </Grid>
                                  <Typography variant="h5">
                                    {feedback.introduction}
                                  </Typography>
                                  <Typography variant="h6">
                                    {feedback.description}
                                  </Typography>
                                </Paper>
                              </Grid>
                            );
                          })}
                        </>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={1}
              className={classes.gridContainer}
              xs={12}
              sm={12}
              md={12}
            >
              <Grid item xs={12} sm={12} md={12}></Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Paper
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: "#F7F8FC",
                  }}
                  elevation={6}
                >
                  <Box>
                    <CommentSection course={course} course_id={course_id} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* <CommentSection Book={""} /> */}
        </Container>
      </Grow>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        onClose={handleClose2}
        message="尚未登入喔"
        key={"topcenter"}
      >
        <MuiAlert onClose={handleClose2} severity="info" sx={{ width: "100%" }}>
          尚未登入喔
        </MuiAlert>
      </Snackbar>
      <Footer />
    </>
  );
};

const getChineseName = (semester) => {
  if (semester[3].toString() == 1) {
    return semester.toString().slice(0, 3) + "/" + "上";
  } else {
    return semester.toString().slice(0, 3) + "/" + "下";
  }
};

export default CourseDetail;
