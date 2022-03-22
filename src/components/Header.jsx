import "./Header.css";
import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";

import { useRecoilValue } from "recoil";
import { cartInfo } from "../store/index";
import BallotIcon from "@mui/icons-material/Ballot";

import StorefrontIcon from "@mui/icons-material/Storefront";

function Header() {
  const [, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { totalPrice, totalQty } = useRecoilValue(cartInfo);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton size="large" color="inherit">
          <BallotIcon />
        </IconButton>
        <Link to="/products">
          <p>Products</p>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <IconButton size="large" aria-label={totalQty} color="inherit">
          <Badge badgeContent={totalQty} color="error">
            <ShoppingIcon />
          </Badge>
        </IconButton>
        <Link to="/cart">
          <p>Cart</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" size="large">
            <Link to="/">
              <StorefrontIcon fontSize="medium" />
              Webshop
            </Link>
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">
              <Link to="/products">Products</Link>
            </Button>

            <IconButton size="large" aria-label={totalQty} color="inherit">
              <Badge badgeContent={totalQty} color="error">
                <Link to="/cart">
                  <ShoppingIcon />
                </Link>
              </Badge>
            </IconButton>

            <Button color="inherit">
              <Link to="/cart">
                Total <br />€ {totalPrice}
              </Link>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

export default Header;
