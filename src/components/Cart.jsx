import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartInfo, cartState } from "../store/index";

function Header() {
  const { totalPrice, totalQty, shoppingCart } = useRecoilValue(cartInfo);
  const currentCart = useRecoilValue(cartState);
  console.dir(currentCart);
  console.log(shoppingCart);
  return (
    <div>
      <Link to="/cart">Cart</Link>
      {totalPrice}
      <br />
      {totalQty}
    </div>
  );
}

export default Header;
