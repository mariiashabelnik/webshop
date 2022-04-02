import React, { useState } from "react";

import { Helmet } from "react-helmet";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormGroup, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      username: username,
      password: password,
      role: "user",
      name: {
        firstname: firstname,
        lastname: lastname,
      },
      address: {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
      },
      phone: phone,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://k4backend.osuka.dev/users",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      // GOOD SIGNUP
      navigate("/login");
    } catch (error) {
      setErrorMessage("Problem to create account");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Mariia webshop - Signup</title>
      </Helmet>

      <Paper elevation={4}>
        <Typography variant="h5" pl={2} pr={2} pt={2}>
          Please SignUp
        </Typography>
        <FormGroup>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} md={6}>
              {/*username imput*/}
              <TextField
                label="UserName"
                fullWidth
                size="small"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/*firstname imput*/}
              <TextField
                fullWidth
                label="Firstname"
                size="small"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/*email imput*/}
              <TextField
                fullWidth
                label="Email"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* street imput*/}
              <TextField
                fullWidth
                label="Street"
                size="small"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* zipcode imput*/}
              <TextField
                fullWidth
                label="Zipcode"
                size="small"
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/*password imput*/}
              <TextField
                fullWidth
                label="Password"
                type="password"
                size="small"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/*lastname imput*/}
              <TextField
                fullWidth
                label="Lastname"
                size="small"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* city imput*/}
              <TextField
                fullWidth
                label="City"
                size="small"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* house number imput*/}
              <TextField
                fullWidth
                label="Number"
                size="small"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* phone imput*/}
              <TextField
                fullWidth
                label="Phone"
                size="small"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              {/*button for signUp*/}
              <Button
                fullWidth
                onClick={() => {
                  signup();
                }}
                variant="contained"
              >
                signup
              </Button>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </FormGroup>
        {/* if something is wrong */}
        {errorMessage}
      </Paper>
    </div>
  );
}

export default SignUp;
