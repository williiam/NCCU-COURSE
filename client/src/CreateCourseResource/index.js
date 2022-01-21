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
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import ChipInput from "material-ui-chip-input";
import * as api from "../shared/utils/api/index.js";

import useStyles from "./styles";

const CreateCourseGuide = ({ currentId, setCurrentId }) => {
  const params = useParams();
  const course_id = params.course;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [open, setOpen] = React.useState(false);
  const [resourceData, setResourceData] = useState({
    introduction: "",
    description: "",
    user: user?.googleId,
    user_nickname: user?.dbdata?.nickname,
    file_photo: "",
    file: "",
    file_name: "",
    course: course_id,
    course_semester: course_id.slice(0, 4),
    course_code: course_id.slice(4),
  });
  const [course, setCourse] = useState();
  const [response, setResponse] = React.useState();
  const [selected, setSelected] = useState("else");
  const [openBackDrop, setOpenBackDrop] = useState(false);

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

  const checkRequiredField = (semester, code) => {
    //目前資料庫course欄位資料格式不一至（１．不是string而是int 所以0開頭的代碼的0被吃掉了）改用regex
    // if (semester.length === 4 && code.length === 9) {
    //   return true;
    // }
    return true;
  };

  const clear = () => {
    // setCurrentId(0);
    setResourceData({
      rate: 4,
      sweet: 70,
      loading: 70,
      gain: 70,
      introduction: "",
      description: "",
      user: user?.result.googleId,
      user_nickname: "",
      course: course_id,
      course_semester: course_id.slice(0, 4),
      course_code: course_id.slice(4),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resourceData);
    setOpenBackDrop(true);
    if (user?.result?.name) {
      checkRequiredField2();
      const data = await api.createResource(resourceData);
      setResponse(data);
      window.scrollTo(0, 0);
      setOpenBackDrop(false);
      setOpen(true);
      clear();
    }
  };

  const handleLink = () => {
    history.push(`/course/${course_id}`);
  };

  const checkRequiredField2 = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleToggleBackDrop = () => {
    setOpenBackDrop(!openBackDrop);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          請先登入才能上架您的課程資源
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {course ? (
        <Paper className={classes.paper} elevation={6}>
          <Typography variant="h6">
            {currentId ? `Editing "${course?.name}"` : "課程資訊"}
          </Typography>
          學年期：{course.semester.toString().slice(0, 3) + "/" + "上"}
          <br></br>
          科目代碼：{course.course}
          <br></br>
          科目名稱：{course.courseNameZH_TW}
          <br></br>
          教師姓名：{course.instructorZH_TW}
          <br></br>
          學分數：{course.point}
          <br></br>
          上課時間：{course.sessionZH_TW}
          <br></br>
          開課單位：{course.departmentZH_TW}
          <br></br>
          上課教室：{course.classroom}
          <br></br>
          備註：{course.note}
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
          <Typography variant="h6">
            {currentId ? `Editing "${course?.name}"` : "新增修課資源"}
          </Typography>

          <TextField
            name="name"
            variant="outlined"
            label="這個資源的懶人包（30字以內,非必填）"
            required
            fullWidth
            value={resourceData.name}
            onChange={(event) =>
              setResourceData({
                ...resourceData,
                introduction: event.target.value,
              })
            }
          />
          {/* <TextField
            name="introduction"
            variant="outlined"
            label="這個資源的懶人包（30字以內,非必填）"
            fullWidth
            value={resourceData.introduction}
            onChange={(e) =>
              setResourceData({ ...resourceData, introduction: e.target.value })
            }
          /> */}
          {/* <TextField
            name="description"
            variant="outlined"
            label="資源描述"
            required
            fullWidth
            multiline
            rows={4}
            value={resourceData.description}
            onChange={(e) =>
              setResourceData({ ...resourceData, description: e.target.value })
            }
          /> */}
          {/* <Typography variant="h6" className={classes.fileInput}>
          {"上傳封面： "}
        </Typography>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setResourceData({ ...resourceData, file_photo: base64 })
            }
          />
        </div> */}
          <Typography variant="h6" className={classes.fileInput}>
            {"上傳檔案： "}
          </Typography>
          <div className={classes.InputContent}>
            <FileBase
              type="file"
              multiple={false}
              onDone={(e) => {
                console.log(e);
                const base64 = e.base64;
                setResourceData({ ...resourceData });
                setResourceData({
                  ...resourceData,
                  file_name: e.file.name,
                  file: base64,
                });
                console.log(resourceData);
              }}
            />
          </div>
          {/* <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setResourceData({ ...resourceData, file2: base64 })
            }
          />
        </div>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setResourceData({ ...resourceData, file3: base64 })
            }
          />
        </div> */}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="匿名(不使用暱稱)"
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>

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
                <span>建立資源失敗</span>
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
              <span>建立資源成功</span>
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
      <Backdrop
          className={classes.backdrop}
          open={openBackDrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </>
  );
};

export default CreateCourseGuide;
