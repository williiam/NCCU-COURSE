import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  Slider,
  MenuItem,
  Checkbox,
  Box,
  Snackbar,
  IconButton,
  Divider,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import * as api from "../shared/utils/api/index.js";
import Rating from "@material-ui/lab/Rating";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";

import useStyles from "./styles";

const CreateCourseGuide = ({ currentId, setCurrentId }) => {
  const params = useParams();
  const course_id = params.course;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(TransitionUp);
  const [response, setResponse] = React.useState();

  const [feedBackData, setFeedBackData] = useState({
    rate: 3.5,
    sweet: 3.5,
    loading: 3.5,
    gain: 3.5,
    introduction: "",
    description: " ",
    user: user?.result.googleId,
    user_nickname: "",
    course: course_id,
    course_semester: course_id.slice(0, 4),
    course_code: course_id.slice(4),
  });
  const [course, setCourse] = useState();
  const [selected, setSelected] = useState("else");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const course_id = params.course;
    if (course_id) {
      getCourse(course_id);
    }
  }, []);

  const getCourse = async (course_id) => {
    if (checkRequiredField(course_id)) {
      const { data } = await api.fetchCourse({ course_id });
      setCourse(data[0]);
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

  const clear = () => {
    // setCurrentId(0);
    setFeedBackData({
      rate: feedBackData.rate,
      sweet: feedBackData.sweet,
      loading: feedBackData.loading,
      gain: feedBackData.gain,
      introduction: "",
      description: " ",
      user: user?.result.googleId,
      user_nickname: "",
      course: course_id,
      course_semester: course_id.slice(0, 4),
      course_code: course_id.slice(4),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.result?.name) {
      checkRequiredField2();
      const data = await api.createFeedBack(feedBackData);
      setResponse(data);
      window.scrollTo(0, 0);
      setOpen(true);
      history.push(`/course/${feedBackData?.course}`);
      clear();
    }
  };

  const checkRequiredField2 = () => {
    //檢查填入欄位是否正確
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          請先登入才能新增您的評價
        </Typography>
      </Paper>
    );
  }

  //slider
  const handleSweetSlider = (event, value) => {
    setFeedBackData({ ...feedBackData, sweet: value });
  };

  const handleLoadingSlider = (event, value) => {
    setFeedBackData({ ...feedBackData, loading: value });
  };

  const handleGainSlider = (event, value) => {
    setFeedBackData({ ...feedBackData, gain: value });
  };

  //slider
  function valuetext(value) {
    return `${value}°C`;
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleLink = () => {
    history.push(`/course/${course_id}`);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          請先登入才能上架您的攻略
        </Typography>
      </Paper>
    );
  }

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  return (
    <>
      {course ? (
        <Paper className={classes.paper} elevation={6}>
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
          {course.note}
        </Paper>
      ) : (
        <></>
      )}
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          // noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h4" className={classes.stars}>
            {currentId ? `Editing "${course?.name}"` : "新增課程評價"}
          </Typography>

          {/* <TextField
            name="name"
            variant="outlined"
            label="標題"
            required
            fullWidth
            value={feedBackData.name}
            onChange={(event) =>
              setFeedBackData({ ...feedBackData, name: event.target.value })
            }
          /> */}

          <div className={classes.sliderWrapper}>
            <div className={classes.sliderContent}>
              <Typography variant="h6" component="h6">
                選擇總推薦指數
              </Typography>
              <div styles={{ textAlign: "start" }} className={classes.notify}>
                <Typography
                  variant="h6"
                  styles={{ textAlign: "left" }}
                  className={classes.lightText}
                >
                  點擊星星來給分
                </Typography>
              </div>
              <Rating
                size="large"
                name="simple-controlled"
                value={feedBackData.rate}
                precision={0.5}
                className={classes.stars}
                onChange={(event, newValue) => {
                  setFeedBackData({ ...feedBackData, rate: newValue });
                }}
              />
            </div>
          </div>
          <div className={classes.sliderWrapper}>
            <div className={classes.sliderContent}>
              <Typography
                id="appearence-slider"
                variant="h6"
                component="h6"
                gutterBottom
              >
                選擇甜度
              </Typography>
              <Slider
                defaultValue={feedBackData.sweet}
                getAriaValueText={valuetext}
                aria-labelledby="appearence-slider"
                valueLabelDisplay="on"
                step={0.5}
                marks
                min={0}
                max={5}
                onChange={(event, value) => handleSweetSlider(event, value)}
              />
            </div>
            <div className={classes.sliderContent}>
              <Typography
                id="noteRatio-slider"
                variant="h6"
                component="h6"
                gutterBottom
              >
                選擇涼度
              </Typography>
              <div styles={{ textAlign: "start" }} className={classes.notify}>
                <Typography
                  variant="h6"
                  styles={{ textAlign: "left" }}
                  className={classes.lightText}
                >
                  滑動線段上的點來給分
                </Typography>
              </div>
              <Slider
                defaultValue={2.5}
                getAriaValueText={valuetext}
                aria-labelledby="noteRatio-slider"
                valueLabelDisplay="on"
                step={0.5}
                marks
                fullWidth
                min={0}
                max={5}
                onChange={(event, value) => handleLoadingSlider(event, value)}
              />
            </div>
            <div className={classes.sliderContent}>
              <Typography
                id="noteRatio-slider"
                variant="h6"
                component="h6"
                gutterBottom
              >
                選擇收穫
              </Typography>
              <div styles={{ textAlign: "start" }} className={classes.notify}>
                <Typography
                  variant="h6"
                  styles={{ textAlign: "left" }}
                  className={classes.lightText}
                >
                  滑動線段上的點來給分
                </Typography>
              </div>
              <Slider
                defaultValue={2.5}
                getAriaValueText={valuetext}
                aria-labelledby="noteRatio-slider"
                valueLabelDisplay="on"
                step={0.5}
                marks
                fullWidth
                min={0}
                max={5}
                onChange={(event, value) => handleGainSlider(event, value)}
              />
            </div>
          </div>
          <div styles={{ textAlign: "start" }} className={classes.notify}>
            <Typography
              variant="h6"
              styles={{ textAlign: "left" }}
              className={classes.lightText}
            >
              若尚未清楚成績或收穫等資訊，建議先選2.5，日後可以回來修改
            </Typography>
          </div>
          <TextField
            name="introduction"
            variant="outlined"
            label="30字以內懶人包（必填）"
            fullWidth
            value={feedBackData.introduction}
            onChange={(e) =>
              setFeedBackData({ ...feedBackData, introduction: e.target.value })
            }
          />
          <TextField
            name="description"
            variant="outlined"
            label="課程評價/ 想分享的資訊（非必填）"
            required
            fullWidth
            multiline
            rows={4}
            value={feedBackData.description}
            onChange={(e) =>
              setFeedBackData({ ...feedBackData, description: e.target.value })
            }
          />
          {/* <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="標籤（教授名,...）"
            fullWidth
            value={feedBackData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div> */}
          {/* <Typography variant="h6" className={classes.fileInput}>
          {"上傳照片： "}
        </Typography>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
feedBack      setFeedBackData({ ...feedBackData, selectedFile: base64 })
            }
          />
        </div> */}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            disabled
            label="匿名（上傳到本站的資料皆採用匿名的方式記錄）"
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            新增評價
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            清除表單
          </Button>
        </form>
      </Paper>
      {/* 三. 或是填寫以下google表單 我們會將資料整合到我們得網站上 */}
      <div>
        {/* <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message={response?.status!==201?"建立評價失敗":"建立評價成功！"}
        action={
          <React.Fragment>
            <Button color="secondary" size="medium" onClick={handleClose}>
              查看
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          TransitionComponent={(props) => <Slide {...props} direction="up" />}
          autoHideDuration={20000}
          onClose={handleClose}
          size="medium"
          message={response?.status !== 201 ? "建立評價失敗" : "建立評價成功！"}
          // className={classes.snackbar}
        >
          {response?.status !== 201 ? (
            <div>
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity="warning"
                className={classes.snackbar}
                s
              >
                <span>建立評價失敗</span>
              </MuiAlert>
            </div>
          ) : (
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="success"
              className={classes.snackbar}
            >
              <span>建立評價成功</span>
              <Button
                variant="filled"
                size="small"
                className={classes.snackbarbtn}
                onClick={handleLink}
              >
                查看
              </Button>
            </MuiAlert>
          )}
        </Snackbar>
      </div>
    </>
  );
};

export default CreateCourseGuide;
