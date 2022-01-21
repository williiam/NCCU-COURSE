import React from "react";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./styles";


export default function ResponsiveDialog({ open, setOpen, response }) {
  // const [open, setOpen] = React.useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const course = response?.data.data
  console.log(response)
  if (response?.status !== 200 || response?.data.data === null) {
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"取得課程資料失敗"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {response?.status !== 200 ? "網路連線錯誤" : "查無此課程"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  const handleCreateResource = () => {
    //可以先把課程資料存到redux裡
    history.push(`/createCourseResource/${course.course}`);
  };

  const handleCreateFeedback = () => {
    history.push(`/createCourseFeedback/${course.course}`);
  };

  const handleEditFeedback = () => {
    history.push(`/editCourseFeedback/${course.course}`);
  };

  const openGoogle = () => {
    navigator.clipboard.writeText(course);

    history.push(`/googleform`);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"以下是您選擇的課程"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            學年期:{course.semester.toString().slice(0, 3) + "/" + "上"}
            <br></br>
            科目名稱:{course.courseNameZH_TW}
            <br></br>
            教師姓名:{course.instructorZH_TW}
            <br></br>
            開課單位：{course.departmentZH_TW}
            <br></br>
            科目代碼:{course.course}
            <br></br>
            學分數：{course.point}
            <br></br>
            上課時間:{course.sessionZH_TW}
            <br></br>
            上課教室:{course.classroom}
            <br></br>
            備註:{course.note}
          </DialogContentText> */}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          {/* <Button onClick={openGoogle} color="primary" autoFocus>
            填寫google表單(已複製科目代碼)
          </Button> */}
          {response?.data.exist_feedback ? (
            <>
              {/* <Button
                onClick={(course) => handleCreateResource(course)}
                color="primary"
              >
                新增此課程的學習資源
              </Button> */}
              <Button
                onClick={(course) => handleEditFeedback(course)}
                color="primary"
                autoFocus
              >
                修改此課程的課程評價
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={(course) => handleCreateResource(course)}
                color="primary"
              >
                新增此課程的學習資源
              </Button>
              <Button
                onClick={(course) => handleCreateFeedback(course)}
                color="primary"
                autoFocus
              >
                新增此課程的課程評價
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
