import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as api from "../shared/utils/api/index.js";

import Icon from "./icon";
import { signin, signup } from "../shared/redux/actions/auth";
import { AUTH } from "../shared/constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    const response = await api.googleSignIn({ token });

    console.info("data",response.data);

    try {
      dispatch({ type: AUTH, data: { result, token ,dbdata:response.data } });

      history.push("/");
    } catch (error) {
    }
  };

  const refreshTokenSetup = async (res) => {

    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem("authToken", newAuthRes.id_token);

      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
        <Paper
              style={{ padding: "10px", borderRadius: "15px", marginTop:'20px' }}
              elevation={5}
            >
              <Box>
                <Typography variant="h5" component="h4"  style={{ textAlign: "center" }}>
                  {/* {"注意事項"} */}
                  {/* 點開再ajax */}
                </Typography>

                <Typography variant="h6" component="h4" gutterTop gutterBottom style={{ textAlign: "center" }}>
                  {"使用您的g.nccu.edu.tw帳號登入"}
                  {/* 點開再ajax */}
                </Typography>
                <Typography variant="h6" component="h4" gutterTop gutterBottom style={{ textAlign: "center" }}>
                  {"才可以進行課程評價喔"}
                  {/* 點開再ajax */}
                </Typography>
                {/* <CardMedia
                    className={classes.hug}
                    image={"https://wallpaper.dog/large/20476811.jpg"}
                    title={"您好，歡迎進入政大課程網!"}
                    // onClick={openPost}
                  /> */}

                {/* <CardMedia
                    className={classes.hug}
                    image={"https://wallpaper.dog/large/20476811.jpg"}
                    title={"您好，歡迎進入政大課程網!"}
                    // onClick={openPost}
                  /> */}
              </Box>
            </Paper>
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "登入"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
             {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"} 
          </Button>
          <GoogleLogin
            clientId="YOURID"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google 登入
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            style={{ marginTop: "100px" }}
          />
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid> */}
        </form>
      </Paper>
    
    </Container>
  );
};

export default SignUp;
