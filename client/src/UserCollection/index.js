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

import { getCoursesByUserLike } from "../shared/redux/actions/course";
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
  type:"",
  subType: "",
  selectedCategory: "new",
  orderMode: "LATEST",
  mon:false,
  tue:false,
  wed:false,
  thi:false,
  fri:false,
  sat:false,
  sun:false,
  morning:false,
  noon:false,
  afternoon:false,
  night:false,
};

const UserCollection = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(0);
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
    const userId = user?.dbdata.id;
    if (userId) {
      dispatch(getCoursesByUserLike({ userId }));
    }
  }, [dispatch]);

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

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  //breadcrumb
  function handleClick(event) {
    //event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  //radio

  const handleChange = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, orderMode: event.target.value });
  };

  const handleCheckbox = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event) => {
     
    if (event.target.value == filter.type) {
      setFilter({ ...filter, type: "" });
    } else {
      setFilter({ ...filter, type: event.target.value });
    }
  };

    //menu
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handle1101 =(event) => {
      handleClose(event)
      setSemester("1101");
    };
  
    const handle1102 = (event) => {
      handleClose(event);
      setSemester("1102");
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        setOpen(false);
      }
    }

  return (
    <Grow in>
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
                to="/user/collection"
                href="/user/collection"
                onClick={handleClick}
              >
                使用者收藏
              </Link>
              <Typography color="textPrimary">{"課程"}</Typography>
              {/* <Typography color="textPrimary">{"110上"}</Typography> */}
              <div>
                <Button
                  ref={anchorRef}
                  variant="outlined"
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Typography color="textPrimary">
                    {getChineseName(semester)}
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
                            onKeyDown={handleListKeyDown}
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
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  onChange={handleRadioChange}
                  value={filter.type}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio color="COMPULSORY" />}
                    label="全部"
                  />
                  {/* <FormControlLabel
                    value="Department"
                    control={<Radio color="COMPULSORY" />}
                    label="系開"
                  /> */}
                  <FormControlLabel
                    value="Integrated"
                    control={<Radio color="ELECTIVE" />}
                    label="整開"
                  />
                  <FormControlLabel
                    value="General"
                    control={<Radio color="GROUP" />}
                    label="通識"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio color="GROUP" />}
                    label="體育/國防"
                  />               
                </RadioGroup>
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

const getChineseName = (semester) => {
  
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

export default UserCollection;