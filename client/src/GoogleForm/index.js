import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grow,
  Container,
  Grid,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Slide
} from "@material-ui/core/";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import * as api from "../shared/utils/api/index.js";


import useStyles from "./styles";
import  useWindowDimensions  from "../shared/hooks/useWindowDimensions.js";

const GoogleForm = () => {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  
  return ( 
    <>
    
          <Typography variant="h5">{"使用google表單進行課程評價"}</Typography>
          <Divider className={classes.divider} />
        <Paper>
          <div>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdr33lzI0WC9GHLRjWu794E5UBKaFllNtJ8e5EqRDnsfvqLmQ/viewform?embedded=true" width={width} height={height} frameborder="0"  >載入中…</iframe>
        </div>
        </Paper>
    
    </>    
  );
};

export default GoogleForm;
