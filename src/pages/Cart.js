import { useRecoilValue } from "recoil";
import { cartInfo } from "../store/index";

function Cart() {
  const { totalPrice, shoppingCart } = useRecoilValue(cartInfo);

  const shoppingUi = shoppingCart.map((item) => {
    return (
      <div key={item.productId}>
        <img src={item.image} alt={item.title} />
        <div>{item.price}</div> {item.title}
      </div>
    );
  });
  return (
    <div>
      Cart <div>{shoppingUi} </div>
      <div>{totalPrice}</div>
    </div>
  );
}

export default Cart;
