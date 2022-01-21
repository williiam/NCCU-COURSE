import React, { useState } from "react";
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
  InputLabel,
  FormControl,
  NativeSelect,
  InputBase,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
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

export default function ResponsiveDialog({ open, setOpen }) {
  const [searchData, setSearchData] = useState({
    semester:"1101",
    course_name: "",
    instructor_name: "",
    department: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSearch = () => {
    history.push(
      `/search/${searchData.course_name}/${searchData.instructor_name}/${searchData.department}/${searchData.semester}`
    );
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bull = <span className={classes.bullet}>{" ／ "}</span>;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="form-dialog-title">課程搜尋</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormControl required className={classes.margin}>
              <InputLabel htmlFor="demo-customized-select-native">
                學期
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={searchData.semester}
                onChange={(event) =>
                  setSearchData({ ...searchData, semester: event.target.value })
                }
                input={<BootstrapInput />}
              >
                <option value={"1101"}>110/上</option>
                <option value={"1102"} >110/下</option>
              </NativeSelect>
            </FormControl>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="課名"
            type=""
            fullWidth
            value={searchData.course_name}
            onChange={(e) =>
              setSearchData({ ...searchData, course_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="name"
            label="教授名"
            type=""
            fullWidth
            value={searchData.instructor_name}
            onChange={(e) =>
              setSearchData({ ...searchData, instructor_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="name"
            label="開課單位"
            type=""
            fullWidth
            value={searchData.department}
            onChange={(e) =>
              setSearchData({ ...searchData, department: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSearch} color="primary">
            搜尋
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
