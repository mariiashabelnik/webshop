import * as React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartInfo, userInformation, isAdmin } from "../store/index";
import "./Header.css";

//mui import
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";

import ShoppingIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import BallotIcon from "@mui/icons-material/Ballot";
import StorefrontIcon from "@mui/icons-material/Storefront";

function Header() {
  const [, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { totalPrice, totalQty } = useRecoilValue(cartInfo);
  const userInfo = useRecoilValue(userInformation);
  const admin = useRecoilValue(isAdmin);

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
      {admin && (
        <MenuItem onClick={handleMenuClose}>
          <IconButton size="large" color="inherit">
            <PersonIcon />
          </IconButton>
          <Link to="/admin">
            <p> Admin</p>
          </Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <IconButton size="large" color="inherit">
          <PersonIcon />
        </IconButton>
        <Link to={userInfo.id ? "/profil" : "/login"}>
          <p> {userInfo.id ? "Profile" : "Login"}</p>
        </Link>
      </MenuItem>
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
          <Button
            color="inherit"
            size="large"
            startIcon={<StorefrontIcon />}
            variant="string"
          >
            <Link to="/">Webshop</Link>
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {admin && (
              <Button color="inherit">
                <Link to="/admin">Admin</Link>
              </Button>
            )}
            <Button color="inherit">
              <Link to="/products">Products</Link>
            </Button>
            <Button color="inherit">
              <Link to={userInfo.id ? "/profile" : "/login"}>
                {userInfo.id ? "Profile" : "Login"}
              </Link>
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
