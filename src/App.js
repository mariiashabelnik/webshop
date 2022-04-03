import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";

import Header from "./components/Header";
import Footer from "./components/Footer";

//mui import
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Helmet>
        <title>Mariia webshop</title>
      </Helmet>
      <Header />
      <Container maxWidth="lg" className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductInfo />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
