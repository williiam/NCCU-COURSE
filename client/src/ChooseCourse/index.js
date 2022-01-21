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
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory, useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import LinkIcon from "@material-ui/icons/Link";
import ResponsiveDialog from "./ResponsiveDialog";
import { getCourse } from "../shared/redux/actions/course";
import * as api from "../shared/utils/api/index.js";

import useStyles from "./styles";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const ChooseCourse = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [courseData, setCourseData] = useState({
    year: "110",
    term: "1",
    code: "",
  });
  const [course, setCourse] = React.useState();
  const [response, setResponse] = React.useState();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleForm = (event) => {
    handelSubmit(event);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const semester = courseData.year + courseData.term;
    const code = courseData.code;
    const course_id=semester+code;
	if(code.length===0){
		return;
	}
    if (checkRequiredField(semester, code)) {
      const data = await api.fetchCourseWithCheck({ courseId: course_id,userId: user?.dbdata.id});
      setCourse(data.data);
      setResponse(data);
      setOpen(true);
      clear();
	    event.preventDefault();
    } else {
      //回報輸入的資料有格式錯誤

	  event.preventDefault();
    }
	event.preventDefault();

    
  };

  const checkRequiredField = (semester, code) => {
    //改用regex
    if (semester.length === 4 && code.length === 9) {
      return true;
    }
    return false;
  };

  const clear = () => {
    // setCurrentId(0);
    setCourseData({
      year: "110",
      term: "1",
      code: "",
    });
  };

  const checkCodeValid = () => {
	  //用regex檢查
	  if(courseData.code.length === 9 && courseData.code.match(/^[0-9]+$/)){
		return true;
	  }
		return false;
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          請先登入才能上架您的書
        </Typography>
      </Paper>
    );
  }

  return (
    <>
     <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6">{"選擇要進行評價的課程"}</Typography>
        <div>
          <form
            onsubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl required className={classes.margin}>
              <InputLabel id="demo-customized-select-label">學年</InputLabel>
              <NativeSelect
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={courseData.semester}
                onChange={(event) =>
                  setCourseData({ ...courseData, year: event.target.value })
                }
                input={<BootstrapInput />}
              >
                {/* <MenuItem value={"110"}>110</MenuItem>               */}
                <option value={"110"}>110</option>
              </NativeSelect>
            </FormControl>
            <FormControl required className={classes.margin}>
              <InputLabel htmlFor="demo-customized-select-native">
                學期
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={courseData.term}
                onChange={(event) =>
                  setCourseData({ ...courseData, term: event.target.value })
                }
                input={<BootstrapInput />}
              >
                <option value={1}>上</option>
                <option value={2}>下</option>
              </NativeSelect>
            </FormControl>
            <FormControl className={classes.input}>
              {/* <InputLabel htmlFor="demo-customized-textbox">科目代碼</InputLabel> */}
              <TextField
                name="name"
                variant="outlined"
                label="科目代碼"
                required
                // fullWidth
                value={courseData.code}
                onChange={(event) =>
                  setCourseData({ ...courseData, code: event.target.value })
                }
              />
            </FormControl>
			
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
			      disabled={checkCodeValid()?false:true}
              fullWidth
              onClick={handleForm}
            >
              選擇課程
            </Button>
          </form>
        </div>
      </Paper>
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6">
          {"#查詢科目代碼"}
          <a
            href="https://qrysub.nccu.edu.tw/"
            target="_blank"
            className={classes.a}
          >
            <LinkIcon>政大課程查詢</LinkIcon>
          </a>
        </Typography>
        <div className={classes.iframe}>
          <iframe
            src="https://qrysub.nccu.edu.tw/"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </Paper>

      <ResponsiveDialog open={open} setOpen={setOpen} response={response} />
    </>
  );
};

export default ChooseCourse;
