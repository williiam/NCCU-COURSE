import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  InputBase,
  Box,
  Select,
  Fab,
  ButtonGroup,
  Menu,
  Badge,
  MenuItem,
  MenuList,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  Divider,
  IconButton,
  Drawer,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";
import DehazeIcon from "@material-ui/icons/Dehaze";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import SearchIcon from "@material-ui/icons/Search";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import ResponsiveDialog from "./ResponsiveDialog";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import NavMenuList from "../MenuList/MenuLIst";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SchoolIcon from "@material-ui/icons/School";
import AdjustIcon from "@material-ui/icons/Adjust";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

import Hidden from "@material-ui/core/Hidden";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import logo from "../../images/logo.png";
import logo2 from "../../images/logo2.png";
import logo3 from "../../images/logo3.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  //drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLink = () => {
    history.push("/departments");
  };

  const handleLink2General = () => {
    history.push("/general");
  };
  const handleLink2Integrated = () => {
    history.push("/integrated");
  };
  const handleLink2Other = () => {
    history.push("/other");
  };

  const handleDepartmentLink = () => {
    history.push("/departments");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"搜尋"} onClick={handleSearch}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"搜尋"} />
        </ListItem>
        <ListItem button key={"科系"} onClick={handleLink}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary={"科系"} />
        </ListItem>
        <ListItem button key={"整開"} onClick={handleLink2Integrated}>
          <ListItemIcon>
            <AdjustIcon />
          </ListItemIcon>
          <ListItemText primary={"整開"} />
        </ListItem>
        <ListItem button key={"通識"} onClick={handleLink2General}>
          <ListItemIcon>
            <EmojiEmotionsIcon />
          </ListItemIcon>
          <ListItemText primary={"通識"} />
        </ListItem>
        <ListItem button key={"體/國"} onClick={handleLink2Other}>
          <ListItemIcon>
            <DirectionsWalkIcon />
          </ListItemIcon>
          <ListItemText primary={"體/國"} />
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={"系上"}>
            <ListItemIcon>
             <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"系上"} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  //select
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //menu
  const handleChooseCourse = () => {
    history.push("/chooseCourse");
    handleClose();
  };

  //handleUserSetting
  const handleUserSetting = () => {
    history.push("/user/setting");
    handleClose();
  };

  //handleUserSetting
  const handleUserPost = () => {
    history.push("/user/post");
    handleClose();
  };
  //handleUserSetting
  const handleUserCollection = () => {
    history.push("/user/collection");
    handleClose();
  };

  //user menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    setOpen(true);
  };

  const handleLogin = () => {
    if (user?.result != undefined) {
      history.push("/posts");
    } else {
      history.push("/auth");
    }
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Hidden mdUp>
        <div>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button
                onClick={toggleDrawer(anchor, true)}
                className={classes.dahaze}
              >
                <DehazeIcon />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
        </Hidden>
        <Hidden smDown>
        <Button onClick={handleSearch} className={classes.dahaze}>
          <SearchIcon />
        </Button>
        </Hidden>

        <Box className={classes.brandContainer}>
          <Link to="/" className={classes.brandContainer}>
            <img component={Link} to="/" src={logo3} alt="icon" height="30px" />
          </Link>
        </Box>
        <Hidden smDown>
          <Divider orientation="vertical" flexItem />
          <Box className={classes.toolbar}>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleLink}
              className={classes.button}
            >
              <h2 className={classes.buttonText}>科系</h2>
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box className={classes.toolbar}>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleLink2Integrated}
              className={classes.button}
            >
              <h2 className={classes.buttonText}>整開</h2>
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box className={classes.toolbar}>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleLink2General}
              className={classes.button}
            >
              <h2 className={classes.buttonText}>通識</h2>
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box className={classes.toolbar}>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleLink2Other}
              className={classes.button}
            >
              <h2 className={classes.buttonText}>體育/國防</h2>
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem />
        </Hidden>
        {/* <Toolbar className={classes.userbar}> */}
        {user?.result ? (
          <div>
            {/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              // variant="contained"
              // color="primary"
              onClick={handleClick}
            >
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user?.result.email.endsWith("@g.nccu.edu.tw") ? (
                <StyledMenuItem onClick={handleChooseCourse}>
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="新增修課評價" />
                </StyledMenuItem>
              ) : (
                <></>
              )}
              {user?.result.email.endsWith("@g.nccu.edu.tw") ? (
                <StyledMenuItem onClick={handleUserPost}>
                  <ListItemIcon>
                    <AssignmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="我的發表" />
                </StyledMenuItem>
              ) : (
                <></>
              )}
              <StyledMenuItem onClick={handleUserCollection}>
                <ListItemIcon>
                  <FavoriteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="我的收藏" />
              </StyledMenuItem>

              <StyledMenuItem onClick={handleUserSetting}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="設定" />
              </StyledMenuItem>

              <StyledMenuItem onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="登出" />
              </StyledMenuItem>
            </StyledMenu>
            {/* <Button onClick={handleChooseCourse}>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Button> */}
          </div>
        ) : (
          <Box className={classes.toolbar}>
            {/* <Button component={Link} to="/auth" variant="contained" color="primary"> */}
            <Button onClick={handleLogin} variant="contained" color="primary">
              登入
            </Button>
          </Box>
        )}
        {/* </Toolbar> */}
      </AppBar>
      <ResponsiveDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
