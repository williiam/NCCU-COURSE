import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Divider,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { colleges } from "../shared/constants/nccuData";

import { getPostsBySearch } from "../shared/redux/actions/posts";
import Departments from "./Departments/Departments";
import Form from "../shared/components/Form/Form";
import Pagination from "../Home/Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = React.useState(-1);
  const [flag, setFlag] = React.useState(0);

  const history = useHistory();



  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, college_id, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={(value !== index && value!==-1)}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tabpanel-${index}`}
        className={classes.departmentsContent}
        {...other}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            style={{ textAlign: "center", marginTop: "15px",marginBottom: "20px" }}
            className={classes.lightText}
          >
            {props.label}
          </Typography>
        </div>
        <Departments college_id={college_id} />
        <Divider className={classes.divider} />
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tabpanel-${index}`,
      college_id: index,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
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
          {/* <Grid item xs={12} sm={6} md={3} hidden>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped tabs example"
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab label="商學院" {...a11yProps(300)} />
                <Tab label="社會科學學院" {...a11yProps(200)} />
                <Tab label="外語學院" {...a11yProps(500)} />
                <Tab label="文學院" {...a11yProps(100)} />
                <Tab label="傳播學院" {...a11yProps(400)} />
                <Tab label="法學院" {...a11yProps(600)} />
                <Tab label="資訊學院" {...a11yProps(703)} />
                <Tab label="理學院" {...a11yProps(700)} />
                <Tab label="國際事務學院" {...a11yProps(203)} />
                <Tab label="教育學院" {...a11yProps(102)} />
                <Tab label="創新國際學院" {...a11yProps(1100)} />
                <Tab label="其他" {...a11yProps(1200)} />
              </Tabs>
              {/* </AppBar> */}
              <TabPanel value={value} index={0} label="商學院" college_id={300}></TabPanel>
              <TabPanel value={value} index={1} label="社會科學學院" college_id={200}></TabPanel>
              <TabPanel value={value} index={2} label="外語學院" college_id={500}></TabPanel>
              <TabPanel value={value} index={3} label="文學院" college_id={100}></TabPanel>
              <TabPanel value={value} index={4} label="傳播學院" college_id={400}></TabPanel>
              <TabPanel value={value} index={5} label="法學院" college_id={600}></TabPanel>
              <TabPanel value={value} index={6} label="資訊學院" college_id={703}></TabPanel>
              <TabPanel value={value} index={7} label="理學院" college_id={700}></TabPanel>
              <TabPanel value={value} index={8} label="國際事務學院" college_id={203}></TabPanel>
              <TabPanel value={value} index={9} label="教育學院" college_id={102}></TabPanel>
              <TabPanel value={value} index={10} label="創新國際學院" college_id={1100}></TabPanel>
              <TabPanel value={value} index={11} label="其他" college_id={1200}></TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

function getChineseName(){

}

export default Home;
