import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Radio,
  Breadcrumbs,
  Typography,
  RadioGroup,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  FormHelperText,
  FormGroup,
  Checkbox,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getCoursesByType } from "../shared/redux/actions/course";
import Courses from "./Courses/Courses";
import Form from "../shared/components/Form/Form";
import Pagination from "./Pagination";
import useStyles from "./styles";
import * as api from "../shared/utils/api/index.js";
import { departmentsData } from "../shared/constants/nccuData";

import moment from "moment";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const defaultFilters = {
  searchTerm: "",
  searchTerm2: "",
  userIds: [],
  myOnly: false,
  pinned: false,
  recent: false,
  subType: "",
  selectedCategory: "new",
  orderMode: "LATEST",
  mon: false,
  tue: false,
  wed: false,
  thi: false,
  fri: false,
  sat: false,
  sun: false,
  morning: false,
  noon: false,
  afternoon: false,
  night: false,
};

const IntegratedCourse = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(0);
  const [type, setType] = useState("Physical");
  const [filter, setFilter] = useState(defaultFilters);
  const [search, setSearch] = useState("");
  const [orderMode, setOrderMode] = useState("");
  const [tags, setTags] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [semester, setSemester] = useState("1101");
  const history = useHistory();
  const params = useParams();
  const department = params.departmentId;
  const user = JSON.parse(localStorage.getItem("profile"));

  // const { courses, isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type) {
      dispatch(getCoursesByType({ type,semester }));
    }
  }, [dispatch, type,semester]);

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleLike = () => {
    if (user.result.googleId == undefined) {
      //請先登入
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handle1101 =(event) => {
    handleClose2(event)
    setSemester("1101");
  };

  const handle1102 = (event) => {
    handleClose2(event);
    setSemester("1102");
  };

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  //breadcrumb
  function handleClick(event) {
    //event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const handleChange = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, orderMode: event.target.value });
  };

  const handleCheckbox = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event) => {
    if (event.target.value == filter.subType) {
      setFilter({ ...filter, subType: "" });
    } else {
      setFilter({ ...filter, subType: event.target.value });
    }
  };

  //menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [open2, setOpen2] = React.useState(false);
  const anchorRef2 = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggle2 = () => {
    setOpen2((prevOpen) => !prevOpen);
  };

  const handlePhysical = (event) => {
    handleClose(event);
    setType("Physical");
  };

  const handleND = (event) => {
    handleClose(event);
    setType("All-out Defence");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClose2 = (event) => {
    if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
      return;
    }

    setOpen2(false);
  };

  function handleListKeyDown2(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleListKeyDown22(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen2(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  const prevOpen2 = React.useRef(open2);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    if (prevOpen2.current === true && open2 === false) {
      anchorRef2.current.focus();
    }

    prevOpen.current = open;
    prevOpen2.current = open;
  }, [open,open2]);

  return (
    <Grow in timeout={100}>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
              <Link color="inherit" to="/" href="/" onClick={handleClick}>
                首頁
              </Link>
              <Link
                color="inherit"
                to="/other"
                href="/other"
                onClick={handleClick}
              >
                體／國
              </Link>
              <div>
                <Button
                  ref={anchorRef}
                  variant="contained"
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Typography color="textPrimary">
                    {getChineseName(type)}
                  </Typography>
                </Button>
                <Popper
                  open={open}
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
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown2}
                          >
                            <MenuItem onClick={handlePhysical}>體育</MenuItem>
                            <MenuItem onClick={handleND}>國防</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>

              <Typography color="textPrimary">{"課程"}</Typography>
              {/* <Typography color="textPrimary">{"110上"}</Typography> */}
              <div>
                <Button
                  ref={anchorRef2}
                  variant="outlined"
                  aria-controls={open2 ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle2}
                >
                  <Typography color="textPrimary">
                    {getChineseName2(semester)}
                  </Typography>
                </Button>
                <Popper
                  open={open2}
                  anchorEl={anchorRef2.current}
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
                        <ClickAwayListener onClickAway={handleClose2}>
                          <MenuList
                            autoFocusItem={open2}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown2}
                          >
                            <MenuItem onClick={handle1101}>110/上</MenuItem>
                            <MenuItem onClick={handle1102}>110/下</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                style={{ margin: "10px 10px 0px 10px" }}
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="搜尋課名"
                value={filter.searchTerm}
                onChange={(e) =>
                  setFilter({ ...filter, searchTerm: e.target.value })
                }
              />
              <TextField
                style={{ margin: "10px 10px" }}
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="搜尋教授"
                value={filter.searchTerm2}
                onChange={(e) =>
                  setFilter({ ...filter, searchTerm2: e.target.value })
                }
              />
              {/* <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button> */}
              <div style={{ margin: "10px 15px" }}>
                {type==="Physical"?
                <>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  onChange={handleRadioChange}
                  value={filter.subType}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio color="COMPULSORY" />}
                    label="全部"
                  />
                  <FormControlLabel
                    value="桌球"
                    control={<Radio color="COMPULSORY" />}
                    label="桌球"
                  />
                  <FormControlLabel
                    value="籃球"
                    control={<Radio color="ELECTIVE" />}
                    label="籃球"
                  />
                  <FormControlLabel
                    value="羽球"
                    control={<Radio color="GROUP" />}
                    label="羽球"
                  />
                  <FormControlLabel
                    value="足球"
                    control={<Radio color="GROUP" />}
                    label="足球"
                  />
                  <FormControlLabel
                    value="排球"
                    control={<Radio color="GROUP" />}
                    label="排球"
                  />
                  <FormControlLabel
                    value="網球"
                    control={<Radio color="GROUP" />}
                    label="網球"
                  />
                  <FormControlLabel
                    value="壘球"
                    control={<Radio color="GROUP" />}
                    label="壘球"
                  />
                  <FormControlLabel
                    value="木球"
                    control={<Radio color="GROUP" />}
                    label="木球"
                  />

                  <FormControlLabel
                    value="拳擊"
                    control={<Radio color="GROUP" />}
                    label="拳擊"
                  />
                  <FormControlLabel
                    value="健走"
                    control={<Radio color="GROUP" />}
                    label="健走"
                  />
                  <FormControlLabel
                    value="武術"
                    control={<Radio color="GROUP" />}
                    label="武術"
                  />
                  <FormControlLabel
                    value="田徑"
                    control={<Radio color="GROUP" />}
                    label="田徑"
                  />
                  <FormControlLabel
                    value="橄欖球"
                    control={<Radio color="GROUP" />}
                    label="橄欖球"
                  />
                  <FormControlLabel
                    value="匹克球"
                    control={<Radio color="GROUP" />}
                    label="匹克球"
                  />
                  <FormControlLabel
                    value="體適能"
                    control={<Radio color="GROUP" />}
                    label="體適能"
                  />
                  <FormControlLabel
                    value="現代舞"
                    control={<Radio color="GROUP" />}
                    label="現代舞"
                  />
                  <FormControlLabel
                    value="土風舞"
                    control={<Radio color="GROUP" />}
                    label="土風舞"
                  />
                  <FormControlLabel
                    value="重量訓練"
                    control={<Radio color="GROUP" />}
                    label="重量訓練"
                  />
                  <FormControlLabel
                    value="定向越野"
                    control={<Radio color="GROUP" />}
                    label="定向越野"
                  />
                  <FormControlLabel
                    value="有氧運動"
                    control={<Radio color="GROUP" />}
                    label="有氧運動"
                  />
                  <FormControlLabel
                    value="民俗體育"
                    control={<Radio color="GROUP" />}
                    label="民俗體育"
                  />
                  <FormControlLabel
                    value="國際標準舞"
                    control={<Radio color="GROUP" />}
                    label="國際標準舞"
                  />
                  <FormControlLabel
                    value="彼拉提斯墊上技巧"
                    control={<Radio color="GROUP" />}
                    label="彼拉提斯墊上技巧"
                  />
                  {/* <FormControlLabel
                    value="NONE_IN_1101"
                    control={<Radio color="GROUP" />}
                    label="110/上 未開"
                  /> */}
                </RadioGroup>
                </>:<></>}
              </div>
            </AppBar>
            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            {/* {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )} */}
          </Grid>
          <Grid item xs={12} sm={12} md={10} className={classes.breadcrumb}>
            <Grid
              container
              justify="space-between"
              // alignItems="stretch"
              spacing={3}
              className={classes.optionsContainer}
              xs={12}
            >
              <div className={classes.options}>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item style={{ marginLeft: "10px" }}>
                    顯示詳細資訊
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={expanded}
                          onChange={() => setExpanded(!expanded)}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.star}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.mon}
                        onChange={handleCheckbox}
                        name="mon"
                        color="primary"
                      />
                    }
                    label="一"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.tue}
                        onChange={handleCheckbox}
                        name="tue"
                        color="primary"
                      />
                    }
                    label="二"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.wed}
                        onChange={handleCheckbox}
                        name="wed"
                        color="primary"
                      />
                    }
                    label="三"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.thi}
                        onChange={handleCheckbox}
                        name="thi"
                        color="primary"
                      />
                    }
                    label="四"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.fri}
                        onChange={handleCheckbox}
                        name="fri"
                        color="primary"
                      />
                    }
                    label="五"
                  />
                </FormGroup>
              </div>
              <div className={classes.star}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.morning}
                        onChange={handleCheckbox}
                        name="morning"
                      />
                    }
                    label="早上"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.noon}
                        onChange={handleCheckbox}
                        name="noon"
                      />
                    }
                    label="中午"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.afternoon}
                        onChange={handleCheckbox}
                        name="afternoon"
                      />
                    }
                    label="下午"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.night}
                        onChange={handleCheckbox}
                        name="night"
                      />
                    }
                    label="晚上"
                  />
                </FormGroup>
              </div>
              <div className={classes.star}>
                <InputLabel htmlFor="age-native-simple">排序方式</InputLabel>
                <FormControl className={classes.orderMode}>
                  <NativeSelect
                    value={filter.orderMode}
                    onChange={(e) => handleChange(e)}
                    name="age"
                    className={classes.selectEmpty}
                    inputProps={{
                      "aria-label": "age",
                      id: "age-native-simple",
                    }}
                  >
                    <option value={"LATEST"}>最近更新</option>
                    <option value={"RATE"}>評價</option>
                    <option value={"NUM_OF_FEEDBACK"}>評價數</option>
                    <option value={"NUM_OF_LIKE"}>被收藏數</option>
                    <option value={"SWEET"}>甜度</option>
                    <option value={"LOADING"}>涼度</option>
                    {/* <option value={"DATE"}>上課時段</option> */}
                  </NativeSelect>
                  {/* <FormHelperText>排序方式</FormHelperText> */}
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.breadcrumb}>
              <Courses filter={filter} expanded={expanded} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

const getChineseName = (type) => {
  if (type == "Physical") return "體育";
  if (type == "All-out Defence") return "國防";

  return "";
};

const getChineseName2 = (semester) => {
  
  if(semester[3].toString()==1){
    return semester.toString().slice(0, 3) + "/" + "上";
  }else{
    return semester.toString().slice(0, 3) + "/" + "下";
  }
};

//input: 一個卡片陣列
//output: 過濾過的卡片陣列
const courseFilter = (collections, filters) => {
  const { searchTerm, pinned, recent, subType } = filters;

  if (searchTerm) {
    collections = collections.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (pinned) {
    collections = collections.filter((card) => card.pinned === true);
  }
  if (recent) {
    collections = collections.filter((card) =>
      moment(card.updatedAt).isAfter(moment().subtract(3, "days"))
    );
  }

  collections = collections.filter((course) => course.subType === subType);

  return collections;
};

export default IntegratedCourse;
