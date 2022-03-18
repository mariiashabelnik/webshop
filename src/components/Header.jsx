import "./Header.css";
import Cart from "./Cart";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Cart />
    </div>
  );
}

export default Header;
