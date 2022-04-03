import React, { useEffect, useState } from "react";
import { userInformation } from "../store/index";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//mui import
import {
  FormGroup,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect", userInfo);
    if (userInfo.id) {
      // we have user information
      navigate("/products");
    }
  }, [userInfo, navigate]);

  //if user successfull login get more info
  const getUserInformation = async (userId) => {
    console.log("get user information");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://k4backend.osuka.dev/users/" + userId,
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  };

  const login = async () => {
    // copy from Postman/API
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://k4backend.osuka.dev/auth/login",
        requestOptions
      );
      const data = await response.json();
      setErrorMessage("");

      const userInfo = await getUserInformation(data.userId);

      setUserInfo(userInfo);
    } catch (error) {
      setErrorMessage("Bad login credentials");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Webshop - Login</title>
      </Helmet>

      <Paper elevation={4} sm={{ width: "100%" }} xs={{ width: "100%" }}>
        <Typography variant="h5" pl={2} pr={2} pt={2}>
          Please LogIn
        </Typography>
        <FormGroup>
          <Grid container spacing={2} padding={2}>
            {/*name imput*/}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Username"
                size="small"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            {/*password imput*/}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Password"
                size="small"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            {/*button for login*/}
            {/* button for signup*/}
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1">
                Create new account? <Link to="/signup">Sign up</Link>
              </Typography>
            </Grid>{" "}
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                onClick={() => {
                  login();
                }}
                variant="contained"
              >
                login
              </Button>
            </Grid>
          </Grid>{" "}
        </FormGroup>
        {/* if a name or/and password is wrong */}
        {errorMessage}
      </Paper>
    </div>
  );
}

export default Login;
