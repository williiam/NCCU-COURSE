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
                      {"歡迎進入政大課程評價網"}
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
                      {"歡迎進入"}
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
                      {"政大課程評價網"}
                    </Typography>
                  </Hidden>
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom
                    style={{ textAlign: "center", color: "white" }}
                    className={classes.lightText}
                  >
                    本站提供以下2大功能給政大的學生使用
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
                            {"查詢課程評價"}
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
                            想要尋找他人經驗的學弟妹
                          </Typography>
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center" }}
                            className={classes.lightText}
                          >
                            請點擊上方的一排快速按鈕
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
                            選擇想要查找的課程類別後，就會進入課程查詢頁面
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
                            左側有搜尋列可以使用，鍵入課程姓名、教師姓名，或是勾選時段，快速找到自己想找的課程
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
                            點擊課程卡片，即可查看該門課程的評價
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
                            {"上傳課程評價"}
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
                            想要分享自己修課經驗的善心人士們
                          </Typography>

                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "10px" }}
                            className={classes.lightText}
                          >
                            請點擊右上角登入按鈕
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
                            在登入後點自己的頭像即可看見新增課程評價的選項
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
                            如果您覺得上述步驟太麻煩
                          </Typography>
                          <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            style={{ textAlign: "center", marginTop: "5px" }}
                            className={classes.lightText}
                          >
                            也可以在進入課程頁面後點擊鉛筆圖示進行評價
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
                              填寫課程評價
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
                          本站使用說明書
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
                    {"現在新增課程評價可以參加抽獎喔！"}
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
                      填寫課程評價
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
                        {"抽獎資訊"}
                        {/* 點開再ajax */}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"獎項：現金200元（共10組）"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"抽獎截止日期：2022 2/28"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"注意事項："}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {
                          "每人僅一次獲獎機會，並請使用您的g.nccu.edu.tw信箱填寫表單"
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"不可重複填寫同一堂課的評價"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"能評價的課程僅限同學在110上學期修的課(棄修不算喔)"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"登入本站後上傳評價的同學將抽出5位"}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h4"
                        gutterBottom
                        style={{ textAlign: "left", color: "gray" }}
                      >
                        {"使用google表單上傳評價的同學也將抽出5位"}
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
                        {"抽獎結果會公布在"}
                        <a
                          href="https://www.facebook.com/dscnccu/"
                          target="_blank"
                        >
                          政大GDSC
                        </a>
                        {"，請多關注我們喔"}
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
                  {/* {"本站貼文串"} */}
                  {/* 點開再ajax */}
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
                  label="搜尋貼文"
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
                  搜尋
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
                {/* {"本網站尚在測試階段"}                     */}
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
                {"關於政大課程評價網"}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                政大課程評價網是一個由政大GDSC(Google Developer Student
                Club)課程評價小組開發出的網站。
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
                我們一方面向校方請求開放Data，另一方面聆聽同學們的需求並不斷發想新的點子，
              </Typography>

              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                style={{ textAlign: "center", paddingBottom: "15px" }}
              >
                我們不僅純粹的coding，我們希望結合行銷、設計、工程等不同領域的人才，不斷地進步使平台變的更好。
              </Typography>
              {/* <Typography
                variant="h6"
                component="h6"                
                gutterBottom
                style={{ textAlign: "center" , paddingBottom: "10px" }}
              >
                {"如果對本站有建議或提案，"}
                {"歡迎填寫"}
                <a
                  href="https://forms.gle/zuDo1zLY1Y5kg4Gx6"
                  target="_blank"
                  className={classes.a}
                >
                  表單
                </a>
                。
              </Typography> */}
              {/* <Typography
                variant="h6"
                component="h4"                
                gutterBottom
                style={{ textAlign: "center" , paddingBottom: "10px" }}
              >
                {"讓我們知道，謝謝！"}
              </Typography> */}
              {/* <Typography
                variant="h6"
                component="h4"                
                gutterBottom
                style={{ textAlign: "center" }}
              >
                {/* {"（我們團隊目前只有個人）"} 
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
              © 2021 GDSC-課程評價小組
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
