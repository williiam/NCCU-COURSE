import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,  
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as api from "../../../../shared/utils/api/index.js";
import useStyles from "./styles";

export default function AlertDialog({ open, setOpen, feedback, setDeleteResponse }) {
  const classes = useStyles();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  const handleDelete= async () => {

    const response = await api.deleteFeedBack({ _id: feedback._id});
    setDeleteResponse(response)
    handleClose()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"確認要刪除您對此課程的評價？"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6" component="h2">
              {/* 確認要刪除您對此課程的評價？ */}
            </Typography>
            <Typography variant="h6" component="h2">
            {feedback?.course_data.semester.toString().slice(0, 3) +
                            "/" +
                            "上"}{" "}
                          {bull} {feedback?.course_data.sessionZH_TW}
                        </Typography>
                        <div className={classes.a}>
                          <Typography
                            variant="h5"
                            component="h2"
                            className={classes.title}
                          >
                            {feedback?.course_data.courseNameZH_TW}
                          </Typography>
                        </div>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {feedback?.course_data.instructorZH_TW} {bull}
                          {feedback?.course_data.departmentZH_TW}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={()=>handleDelete()} color="secondary" autoFocus>
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
