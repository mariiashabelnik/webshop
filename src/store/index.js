//här ligger selectorer och atomer = Recoil

import { atom, selector } from "recoil";

// save in localstorage
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// fetch products from API
async function getProducts() {
  const response = await fetch("https://k4backend.osuka.dev/products");
  const data = await response.json();

  return data;
}

// run getProducts when atom effect is triggered
const loadProductEffect =
  () =>
  async ({ setSelf, trigger }) => {
    if (trigger === "get") {
      const data = await getProducts();
      setSelf(data);
    }
  };

// list of all products
export const products = atom({
  key: "productState",
  default: [],
  effects: [loadProductEffect()],
});

// user information
export const userInformation = atom({
  key: "userInformation",
  default: {},

  //set info i browser
  effects: [localStorageEffect("userInformation")],
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
  default: {}, // default value (aka initial value)
  effects: [localStorageEffect("usercart")],
});

export const cartInfo = selector({
  key: "cartInfo",
  get: ({ get }) => {
    const productList = get(products);
    const cartList = get(cartState);

    let totalPrice = 0;
    let totalQty = 0;
    const shoppingCart = [];
    for (const [productId, qty] of Object.entries(cartList)) {
      totalQty += qty;
      const productInfo = productList.find(
        (item) => item.id === parseInt(productId, 10)
      ) || {
        price: 0,
        title: "",
        image: "",
      };

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
