import { atom, selector } from "recoil";
import rawProductList from "./products.json";

// save in localstorage
const localStorageEffectMap =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    // take out text from localstorage
    if (savedValue != null) {
      // we have localestorage, convert the text into a Map
      setSelf(new Map(JSON.parse(savedValue)));
    }

    onSet((newValue, _, isReset) => {
      // new data is set lets store it in localstorage but first
      // convert data in map into a json string
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(
            key,
            JSON.stringify(Array.from(newValue.entries()))
          );
    });
  };

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
  default: new Map(), // default value (aka initial value)
  effects: [localStorageEffectMap("cart")],
});

export const cartInfo = selector({
  key: "cartInfo",
  get: ({ get }) => {
    const productList = get(products);
    const cartList = get(cartState);

    let totalPrice = 0;
    let totalQty = 0;
    const shoppingCart = [];
    for (const [productId, qty] of cartList) {
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

    totalPrice = Math.round(totalPrice);
    return { totalPrice, totalQty, shoppingCart };
  },
});
