import React, { useEffect, useState } from "react";
import { userInformation } from "../store/index";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
      navigate("/profile");
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
        <title>Mariia webshop - Home</title>
      </Helmet>

      <Paper elevation={4}>
        {/*name imput*/}
        <TextField
          label="Username"
          size="small"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="outlined"
        />

        {/*password imput*/}
        <TextField
          label="Password"
          size="small"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
        />

        {/*button for login*/}
        <Button
          onClick={() => {
            login();
          }}
          variant="contained"
        >
          login
        </Button>

        <Button
          onClick={() => {
            navigate("/signup");
          }}
          variant="contained"
        >
          Signup
        </Button>

        {/* if a name or/and password is wrong */}
        {errorMessage}
      </Paper>
    </div>
  );
}

export default Login;
