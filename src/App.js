import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import ProductInfo from "./pages/ProductInfo";
import { Helmet } from "react-helmet";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

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
