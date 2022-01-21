import React, { useState, useEffect } from "react";
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
  TextField,
  InputAdornment,
  Snackbar,
  Slide
} from "@material-ui/core/";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import * as api from "../shared/utils/api/index.js";

import useStyles from "./styles";
import { UPDATE_NICKNAME } from "../shared/constants/actionTypes.js";

const UserSetting = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { bookId } = useParams();
  const [open, setOpen] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

   

  const [userData, setUserData] = useState({
    userId: user.dbdata.id,
    nickname: user.dbdata.nickname==="NOT_SET"?"":user.dbdata.nickname,
  });  

  const [response, setResponse] = React.useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.result?.name) {
      checkRequiredField2();
      const data = await api.updateNickname(userData);
      setResponse(data);
      handleResponse(data);
      window.scrollTo(0, 0);
      setOpen(true);
      clear();
    }
  };

  const clear = () => {
    setUserData({
      ...userData,
      nickname: user.dbdata.nickname==="NOT_SET"?"":user.dbdata.nickname,
    })
  };

  const checkRequiredField2 = () => {
    //檢查填入欄位是否正確
  };

  const handleResponse = (_response) => {

    if(_response?.status === 201){
      let _dbdata=user.dbdata;
      _dbdata.nickname=_response.data.nickname;
      dispatch({ type: UPDATE_NICKNAME, data: { ...user,dbdata:_dbdata} });
    }
    else{

    }
  }

   


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

    //history.push(`/course/${course_id}`);
  }

  return ( 
    <>
    <Grow in>
      <Container maxWidth="xl">
          <Typography variant="h5">{'設定您在留言時的暱稱(預設為"匿名")'}</Typography>
          <Divider className={classes.divider} />
        <Paper>
          <Container maxWidth="xl" className={classes.form}>          
          <Typography variant="p" style={{lineHeight: '3'}}>{"我的暱稱："}</Typography>
          <TextField
            label={ user.dbdata.nickname==="NOT_SET"?"尚未設定":""}
            id="outlined-start-adornment"
            // className={clsx(classes.margin, classes.textField)}
            value={userData.nickname}
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
            variant="outlined"
          />
   
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.buttonSubmit}
            onClick={handleSubmit}
            fullWidth
          >
            更新使用者設定
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            還原
          </Button>          
          </Container>
        </Paper>
      </Container>
    </Grow>
    <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          TransitionComponent={(props)=>(<Slide{...props} direction="up" />)}
          autoHideDuration={5000}
          onClose={handleClose}
          size="medium"
          message={response?.status !== 201 ? "建立評價失敗" : "建立評價成功！"}
          // className={classes.snackbar}
        >
          {response?.status !== 201 ? (
            <div>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="warning" className={classes.snackbar}s>
              <span>設定暱稱失敗</span>
            </MuiAlert>
            </div>
          ) : (
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success" className={classes.snackbar}>
               <span>設定暱稱成功</span>
            </MuiAlert>
          )}
        </Snackbar>
    </>
  );
};

export default UserSetting;
