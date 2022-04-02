import { useRecoilValue, useRecoilState } from "recoil";
import { cartInfo, cartState } from "../store/index";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import "./Cart.css";

function Cart() {
  const { totalPrice, shoppingCart, totalQty } = useRecoilValue(cartInfo);
  const [cart, setCartState] = useRecoilState(cartState);

  const addQty = (id, count) => {
    const newCart = { ...cart };
    const currentQty = newCart[id];
    const nextQty = currentQty + count;
    if (nextQty > 0) {
      newCart[id] = nextQty;
      setCartState(newCart);
    }
  };

  const remove = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCartState(newCart);
  };

  const shoppingUi = shoppingCart.map((item) => {
    return (
      <div key={item.productId}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4}>
            <Link to={"/product/" + item.productId}>
              <img className="cartImg" src={item.image} alt={item.title} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" component="div">
              {item.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Price: € {item.price}
            </Typography>

            <div>
              <Button
                onClick={() => {
                  addQty(item.productId, -1);
                }}
                variant="contained"
              >
                -
              </Button>

              <TextField
                size="small"
                id="outlined-basic"
                value={item.qty}
                variant="outlined"
              />

              <Button
                onClick={() => {
                  addQty(item.productId, 1);
                }}
                variant="contained"
              >
                +
              </Button>
            </div>
            <Button
              onClick={() => {
                remove(item.productId);
              }}
              variant="contained"
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  });

  return (
    <div>
      <Paper elevation={4}>
        <Grid container spacing={2} pb={2}>
          <Grid item xs={12} sm={6}>
            <div>{shoppingUi}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography variant="subtitle1">Shipping: free</Typography>
              <Typography variant="subtitle1">Items: {totalQty}</Typography>
              <Typography variant="subtitle1">Total: € {totalPrice}</Typography>
              <Button variant="contained">Check out</Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Cart;
