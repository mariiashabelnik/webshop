import React, { useEffect, useState } from "react";
import { userInformation } from "../store/index";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const [username, setUsername] = useState("MariiaSh");
  const [password, setPassword] = useState("m38rmF$");
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  console.log(userInfo);

  const login = async () => {
    /* copy from Postman/API*/
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
      setUserInfo(data);
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
          size="small"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="outlined"
        />

        {/*password imput*/}
        <TextField
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

        {errorMessage}
      </Paper>
    </div>
  );
}

export default Login;
