import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../store/index";

function Product({ title, image, price, id }) {
  const [qty, setQty] = useState(1);
  const [cart, setCartState] = useRecoilState(cartState);

  const handleChange = (event) => {
    setQty(event.target.value);
  };

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

  const maxTitleLength = 18;
  if (title.length > maxTitleLength) {
    title = title.substr(0, maxTitleLength) + "...";
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Price: € {price}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to={"/product/" + id}>
            <Button size="small">Read more</Button>
          </Link>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qty}
              label="Qty"
              onChange={handleChange}
            >
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
          </FormControl>

          <Button variant="contained" size="small" onClick={addToCart}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Product;
