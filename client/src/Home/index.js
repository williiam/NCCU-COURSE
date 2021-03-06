import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Card,
  Box,
  Paper,
  CardMedia,
  Typography,
  Divider,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostsBySearch } from "../shared/redux/actions/posts";
import Posts from "./Posts/Posts";
import Form from "../shared/components/Form/Form";
import Pagination from "./Pagination";
import useStyles from "./styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ComputerIcon from "@material-ui/icons/Computer";
import ExploreIcon from "@material-ui/icons/Explore";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CreateIcon from "@material-ui/icons/Create";
import FacebookIcon from "@material-ui/icons/Facebook";
import CommentIcon from "@material-ui/icons/Comment";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import InfoIcon from "@material-ui/icons/Info";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ButtonBases from "./ButtonBases";

import header from "../shared/images/header.png";
import courses from "../shared/images/courses.png";
import click from "../shared/images/click.png";
import login from "../shared/images/login.png";
import useroption from "../shared/images/useroption.png";
import form_btn from "../shared/images/form_btn.png";
import promote from "../shared/images/promote.png";
import promote2 from "../shared/images/promote2.png";
import edit from "../shared/images/edit.png";
import small_promote from "../shared/images/small_promote.png";

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
      // searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const handleMoodle = () => {
    window.open("https://moodle.nccu.edu.tw/?redirect=0", "_blank");
  };

  const handleWm5 = () => {
    window.open("https://wm5.nccu.edu.tw/mooc/login.php", "_blank");
  };

  const handleInccu = () => {
    window.open("https://i.nccu.edu.tw/Home.aspx", "_blank");
  };

  const handleMail = () => {
    window.open("https://nccu.edu.tw/indexs.html", "_blank");
  };

  const openGoogle = () => {
    history.push(`/googleform`);
  };

  const openInstruction = () => {
    window.open(
      "https://hackmd.io/@_YdT2NPxQtGdnDBoiC3yQg/rkFlfACjt",
      "_blank"
    );
  };

  const openFB = () => {
    window.open("https://www.facebook.com/dscnccu", "_blank");
  };

  const openGoogleForm = () => {
    window.open("https://forms.gle/zuDo1zLY1Y5kg4Gx6", "_blank");
  };

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          {/* welcome /useful links / photos / icons / guide / news / */}
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Paper
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  marginTop: "0px",
                  backgroundColor: "#8993CB",
                }}
                elevation={6}
              >
                <Box>
                  <Hidden xsDown>
                    <Typography
                      variant="h5"
                      component="h5"
                      gutterBottom
                      style={{
                        textAlign: "center",
                        color: "white",
                        lineHeight: "2",
                        letterSpacing: "0.1em",
                        fontSize: "33px",
                        fontWeight: "450",
                      }}
                    >
                      {"?????????????????????????????????"}
                    </Typography>
                  </Hidden>
                  <Hidden smUp>
                    <Typography
                      variant="h5"
                      component="h5"
                      gutterBottom
                      style={{
                        textAlign: "center",
                        color: "white",
                        lineHeight: "2",
                        letterSpacing: "0.1em",
                        fontSize: "33px",
                        fontWeight: "450",
                      }}
                    >
                      {"????????????"}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="h5"
                      gutterBottom
                      style={{
                        textAlign: "center",
                        color: "white",
                        lineHeight: "2",
                        letterSpacing: "0.1em",
                        fontSize: "33px",
                        fontWeight: "450",
                      }}
                    >
                      {"?????????????????????"}
                    </Typography>
                  </Hidden>
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom
                    style={{ textAlign: "center", color: "white" }}
                    className={classes.lightText}
                  >
                    ??????????????????2?????????????????????????????????
                  </Typography>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    className={classes.gridContainer}
                  >
                    <Grid item xs={12} sm={12} md={6}>
                      <Paper
                        style={{
                          padding: "20px",
                          borderRadius: "15px",
                          marginTop: "0px",
                        }}
                        elevation={6}
                      >
                        <Box>
                          <Typography
                            variant="h4"
                            component="h4"
                            gutterBottom
                            style={{
                              textAlign: "center",
                              fontWeight: "400",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {"??????????????????"}
                          </Typography>
                          <Divider
                            style={{ textAlign: "center", marginTop: "30px",marginBottom: "30px" }}
                        
                            ></Divider>
                          <img to="/" src={header} alt="icon" width="100%" />

                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center" }}
                            className={classes.lightText}
                          >
                            ????????????????????????????????????
                          </Typography>
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center" }}
                            className={classes.lightText}
                          >
                            ????????????????????????????????????
                          </Typography>
                          <Divider
                            style={{
                              textAlign: "center",
                              marginTop: "30px",
                              marginBottom: "30px",
                            }}
                          ></Divider>
                          {/* <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{
                              textAlign: "center",
                              marginBottom: "30px",
                            }}
                            className={classes.lightText}
                          >
                            ?????????????????????????????????????????????????????????????????????
                          </Typography> */}
                          <img to="/" src={courses} alt="icon" width="100%" />
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{
                              textAlign: "center",
                              marginTop: "5px",
                              marginBottom: "30px",
                            }}
                            className={classes.lightText}
                          >
                            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                          </Typography>
                          <Divider
                            style={{
                              textAlign: "center",
                              marginTop: "30px",
                              marginBottom: "30px",
                            }}
                          ></Divider>
                          <img
                            to="/"
                            src={click}
                            alt="icon"
                            width="100%"
                            className={classes.img}
                          />
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "5px" }}
                            className={classes.lightText}
                          >
                            ??????????????????????????????????????????????????????
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Paper
                        style={{
                          padding: "20px",
                          borderRadius: "15px",
                          marginTop: "0px",
                        }}
                        elevation={6}
                      >
                        <Box>
                          <Typography
                            variant="h4"
                            component="h4"
                            gutterBottom
                            style={{
                              textAlign: "center",
                              fontWeight: "400",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {"??????????????????"}
                          </Typography>
                          <Divider
                            style={{ textAlign: "center", marginTop: "30px",marginBottom: "30px" }}
                        
                            ></Divider>
                                           <img
                            to="/"
                            src={login}
                            alt="icon"
                            className={classes.img}
                          />
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center",marginTop: "10px" }}
                            className={classes.lightText}
                          >
                            ????????????????????????????????????????????????
                          </Typography>

                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "10px" }}
                            className={classes.lightText}
                          >
                            ??????????????????????????????
                          </Typography>
           

                          <Divider
                            style={{
                              textAlign: "center",
                              marginTop: "30px",
                              marginBottom: "30px",
                            }}
                          ></Divider>

                          <img
                            src={useroption}
                            alt="icon"
                            className={classes.img}
                          />
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{
                              textAlign: "center",
                              marginTop: "15px",
                              marginBottom: "30px",
                            }}
                            className={classes.lightText}
                          >
                            ?????????????????????????????????????????????????????????????????????
                          </Typography>

                          <Divider
                            style={{
                              textAlign: "center",
                              marginTop: "30px",
                              marginBottom: "30px",
                            }}
                          ></Divider>

                          <img
                            src={edit}
                            alt="icon"
                            // className={classes.img}
                            width="100%"
                          />
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "5px" }}
                            className={classes.lightText}
                          >
                            ????????????????????????????????????
                          </Typography>
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "5px" }}
                            className={classes.lightText}
                          >
                            ???????????????????????????????????????????????????????????????
                          </Typography>
                          {/* <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.searchButton}
                              startIcon={<CreateIcon />}
                              onClick={openGoogle}
                              style={{
                                width: "100%",
                                // color: "rgb(163,217,217)",
                                backgroundColor: "#4E52C1",
                                marginTop: "10px",
                                marginBottom: "10px",
                                maxWidth: "300px",
                                height: "50px",
                                fontSize: "20px",
                              }}
                            >
                              ??????????????????
                            </Button>
                          </div> */}
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.searchButton}
                          startIcon={<ExploreIcon />}
                          onClick={openInstruction}
                          style={{
                            width: "100%",
                            // color: "rgb(163,217,217)",
                            backgroundColor: "#17204F",
                            marginTop: "10px",
                            marginBottom: "10px",
                            maxWidth: "300px",
                            height: "50px",
                            fontSize: "20px",
                          }}
                        >
                          ?????????????????????
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Paper
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  marginTop: "0px",
                  backgroundColor: "#D4D8E6",
                }}
                elevation={6}
              >
                <Box>
                  <img to="/" src={small_promote} alt="icon" width="100%" />
                  {/* <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={{ textAlign: "center" }}
                  >
                    {"????????????????????????????????????????????????"}
                  </Typography> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.searchButton}
                      startIcon={<CreateIcon />}
                      onClick={openGoogle}
                      style={{
                        width: "100%",
                        // color: "rgb(163,217,217)",
                        backgroundColor: "#4E52C1",
                        marginTop: "30px",
                        marginBottom: "20px",
                        maxWidth: "500px",
                        height: "50px",
                        fontSize: "20px",
                      }}
                    >
                      ??????????????????
                    </Button>
                  </div>
                  <Box>
                    <Paper
                      style={{
                        padding: "20px",
                        borderRadius: "15px",
                        marginTop: "15px",
                        backgroundColor: "#EDEDF1",
                      }}
                      elevation={6}
                    >
                      <Typography
                        variant="h5"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "center" }}
                      >
                        {"????????????"}
                        {/* ?????????ajax */}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"???????????????200?????????10??????"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"?????????????????????2022 2/28"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"???????????????"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {
                          "????????????????????????????????????????????????g.nccu.edu.tw??????????????????"
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"???????????????????????????????????????"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"?????????????????????????????????110??????????????????(???????????????)"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"?????????????????????????????????????????????5???"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"??????google???????????????????????????????????????5???"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {""}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "center" }}
                      >
                        {"????????????????????????"}
                        <a
                          href="https://www.facebook.com/dscnccu/"
                          target="_blank"
                        >
                          ??????GDSC
                        </a>
                        {"????????????????????????"}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Box>
                <Typography
                  variant="h3"
                  component="h4"
                  gutterBottom
                  style={{ textAlign: "center" }}
                >
                  {/* {"???????????????"} */}
                  {/* ?????????ajax */}
                </Typography>
              </Box>
            </Grid>
            <Divider />
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  onKeyDown={handleKeyPress}
                  name="search"
                  variant="outlined"
                  label="????????????"
                  style={{ marginBottom: "10px" }}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              /> */}
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  variant="contained"
                  color="default"
                >
                  ??????
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ marginTop: "20px", backGroundColor: "gray" }}
          >
            <Box
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "#17204f",
                borderRadius: "5px",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                {/* {"???????????????????????????"}                     */}
              </Typography>
              <Typography
                variant="h5"
                component="h4"
                gutterBottom
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  paddingBottom: "5px",
                }}
              >
                {"???????????????????????????"}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                ???????????????????????????????????????GDSC(Google Developer Student
                Club)???????????????????????????????????????
              </Typography>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                style={{ textAlign: "center" }}
              ></Typography>
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                ????????????????????????????????????Data?????????????????????????????????????????????????????????????????????
              </Typography>

              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center", paddingBottom: "15px" }}
              >
                ?????????????????????coding???????????????????????????????????????????????????????????????????????????????????????????????????????????????
              </Typography>
              {/* <Typography
                variant="h6"
                component="h6"                
                gutterBottom
                style={{ textAlign: "center" , paddingBottom: "10px" }}
              >
                {"????????????????????????????????????"}
                {"????????????"}
                <a
                  href="https://forms.gle/zuDo1zLY1Y5kg4Gx6"
                  target="_blank"
                  className={classes.a}
                >
                  ??????
                </a>
                ???
              </Typography> */}
              {/* <Typography
                variant="h6"
                component="h4"                
                gutterBottom
                style={{ textAlign: "center" , paddingBottom: "10px" }}
              >
                {"???????????????????????????"}
              </Typography> */}
              {/* <Typography
                variant="h6"
                component="h4"                
                gutterBottom
                style={{ textAlign: "center" }}
              >
                {/* {"????????????????????????????????????"} 
              </Typography> */}
            </Box>
            <Typography
              variant="h6"
              component="h4"
              color="inherit"
              style={{
                textAlign: "center",
                color: "slategray",
                fontSize: "15px",
              }}
            >
              ?? 2021 GDSC-??????????????????
              <IconButton onClick={openFB} aria-label="show more">
                <FacebookIcon />
              </IconButton>
              <IconButton onClick={openGoogleForm} aria-label="show more">
                <CallMadeIcon />
              </IconButton>
            </Typography>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
