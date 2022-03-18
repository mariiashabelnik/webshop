import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currentProductId, currentProduct, cartState } from "../store/index";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./ProductInfo.css";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

function ProductInfo() {
  const params = useParams();
  const setCurrentProductId = useSetRecoilState(currentProductId);
  const [cart, setCartState] = useRecoilState(cartState);
  const [qty, setQty] = useState(1);
  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const id = parseInt(params.productId, 10);

  const addToCart = () => {
    const newCart = new Map(cart);
    if (newCart.has(id)) {
      // we have already this item in cart
      const currentQty = newCart.get(id);
      newCart.set(id, currentQty + qty);
    } else {
      // we dont have this item in cart
      newCart.set(id, qty);
    }
    setCartState(newCart);
  };

  useEffect(() => {
    setCurrentProductId(id);
  });
  const productInfo = useRecoilValue(currentProduct);

  return (
    <div>
      <Paper elevation={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img
              className="productImg"
              src={productInfo.image}
              alt={productInfo.title}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" pl={2} pr={2} pb={1}>
              {productInfo.title}
            </Typography>

            <Typography variant="h6" pl={2} pr={2} pb={1}>
              Information:
            </Typography>
            <Typography variant="body2" pl={2} pr={2} pb={1}>
              {productInfo.description}
            </Typography>
            <Typography variant="h6" pl={2} pr={2} pb={1}>
              Price:
            </Typography>
            <Typography variant="body1" pl={2} pr={2} pb={1}>
              € {productInfo.price}
            </Typography>

            <FormControl>
              <Select value={qty} onChange={handleChange}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
              <Button variant="contained" size="small" onClick={addToCart}>
                Add to cart
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProductInfo;
