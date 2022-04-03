import React, { useEffect } from "react";
import { userInformation } from "../store/index";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

//mui import
import { Paper, Typography, Button } from "@mui/material";

function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  console.log(userInfo);
  const navigate = useNavigate();

  const logout = () => {
    const newInfo = { ...userInfo };
    newInfo.id = undefined;
    setUserInfo(newInfo);
  };

  useEffect(() => {
    console.log("use effect", userInfo);
    if (!userInfo.id) {
      // we have user information
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <Helmet>
        <title>
          Webshop - {userInfo.name.firstname || ""}{" "}
          {userInfo.name.lastname || ""}
        </title>
      </Helmet>

      <Paper elevation={4}>
        <Typography variant="subtitle1">
          Name: {userInfo.name.firstname} {userInfo.name.lastname}
        </Typography>

        <Typography variant="subtitle1">Phone: {userInfo.phone}</Typography>
        <Typography variant="subtitle1">
          Address: {userInfo.address.street} {userInfo.address.number},
          <br />
          {userInfo.address.zipcode} {userInfo.address.city}
        </Typography>

        <Typography variant="subtitle1">Email: {userInfo.email}</Typography>
        <Button
          onClick={() => {
            logout();
          }}
          variant="contained"
        >
          LOGOUT
        </Button>
      </Paper>
    </div>
  );
}

export default Profile;
