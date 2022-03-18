import { atom, selector } from "recoil";
import rawProductList from "./products.json";

// list of all products
export const products = atom({
  key: "productState",
  default: rawProductList,
});

// set current product to view
export const currentProductId = atom({
  key: "currentProductId",
  default: 0,
});

// extract one client with id from currentProductId
export const currentProduct = selector({
  key: "currentProduct",
  get: ({ get }) => {
    const productList = get(products);
    const curProductId = get(currentProductId);
    // find my info
    const productInfo = productList.find((item) => item.id === curProductId);
    return productInfo || {};
  },
});

export const cartState = atom({
  key: "cartState", // unique ID (with respect to other atoms/selectors)
  default: new Map([
    [1, 4],
    [3, 4],
  ]), // default value (aka initial value)
});

export const cartInfo = selector({
  key: "cartInfo",
  get: ({ get }) => {
    const productList = get(products);
    const cartList = get(cartState);
    console.log(cartList, productList);
    let totalPrice = 0;
    let totalQty = 0;
    const shoppingCart = [];
    for (const [productId, qty] of cartList) {
      console.log(productId, qty);
      totalQty += qty;
      const productInfo = productList.find((item) => item.id === productId);
      totalPrice += productInfo.price * qty;
      shoppingCart.push({
        productId,
        qty,
        title: productInfo.title,
        image: productInfo.image,
        price: productInfo.price,
      });
    }
    console.log("dasd");
    return { totalPrice, totalQty, shoppingCart };
  },
});
