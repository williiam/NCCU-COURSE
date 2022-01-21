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
  Container,
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
import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import NavMenuList from "../MenuList/MenuLIst";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CreateIcon from "@material-ui/icons/Create";
import FacebookIcon from "@material-ui/icons/Facebook";
import Hidden from "@material-ui/core/Hidden";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import logo from "../../images/logo.png";
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

const Footer = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

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
        <ListItem button key={"系上"} onClick={handleLink}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"系上"} />
        </ListItem>
        <ListItem button key={"整開"} onClick={handleLink2Integrated}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"整開"} />
        </ListItem>
        <ListItem button key={"通識"} onClick={handleLink2General}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"通識"} />
        </ListItem>
        <ListItem button key={"體/國"} onClick={handleLink2Other}>
          <ListItemIcon>
            <InboxIcon />
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
  };

  //handleUserSetting
  const handleUserSetting = () => {
    history.push("/user/setting");
  };

  //handleUserSetting
  const handleUserPost = () => {
    history.push("/user/post");
  };
  //handleUserSetting
  const handleUserCollection = () => {
    history.push("/user/collection");
  };

  //user menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openFB = () => {
    window.open("https://www.facebook.com/dscnccu", "_blank");
  };

  const openGoogleForm = () => {
    window.open("https://forms.gle/zuDo1zLY1Y5kg4Gx6", "_blank");
  };

  return (
    <Typography
    variant="h6"
    component="h6"
    color="inherit"
    style={{
      textAlign: "center",
      color: "slategray",
      fontSize:'15px',
      marginBottom:'0px',
      paddingBottom:'0px',
      height: '10px'
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
  );
};

export default Footer;
