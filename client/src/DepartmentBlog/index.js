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
} from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getCoursesByDepartment } from "../shared/redux/actions/course";
import Courses from "./Courses/Courses";
import Form from "../shared/components/Form/Form";
import Pagination from "./Pagination";
import useStyles from "./styles";

import { departmentsData } from "../shared/constants/nccuData";

import CommentSection from './CommentSection'

import moment from "moment";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  pinned: false,
  recent: false,
  category: '',
  selectedCategory:'new'
};

const Department = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [currentId, setCurrentId] = useState(0);
  const [filter, setFilter] = useState(defaultFilters);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const params = useParams();
  const department = params.departmentId;

  // const { courses, isLoading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    const department = params.departmentId;
    if (department) {
      dispatch(getCoursesByDepartment(department));
    }
  }, [dispatch, department]);

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

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  //breadcrumb
  function handleClick(event) {
    //event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  //radio
  const [selected, setSelected] = React.useState("a");

  const handleChange = (event) => {
    //setSelectedValue(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
    //setBookData({ ...bookData, type: event.target.value });
  };


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
                to="/departments"
                href="/departments"
                onClick={handleClick}
              >
                科系
              </Link>
              <Typography color="textPrimary">
                {getChineseName(params.departmentId)}
              </Typography>
            </Breadcrumbs>
            </Grid>
            </Grid>
        {/* <CommentSection Book={department} /> */}
      </Container>
    </Grow>
  );
};

  //需要把全部開課單位的中音對照表放過來
  const getChineseName = (department) => {
    const selected_department = departmentsData.find(function (
      _department,
      index
    ) {
      if (_department.department == department) return true;
    });
    return selected_department?.chinese_name? selected_department?.chinese_name:"";
  };
//input: 一個卡片陣列
//output: 過濾過的卡片陣列
const bookFilter = (collections,filters) => {
  const {  searchTerm, pinned, recent } = filters;
  
  if (searchTerm) {
    collections = collections.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (pinned) {
    collections = collections.filter(card => card.pinned === true);
  }
  if (recent) {
    collections = collections.filter(card => moment(card.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  return collections;
}


export default Department;
