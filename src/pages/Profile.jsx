import React, { useEffect } from "react";
import { userInformation } from "../store/index";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
        <title>Mariia webshop - Home</title>
      </Helmet>

      <Paper elevation={4}>
        <Typography variant="subtitle1">
          Name: {userInfo.name.firstname}
        </Typography>
        <Typography variant="subtitle1">
          Lastname: {userInfo.name.lastname}
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
