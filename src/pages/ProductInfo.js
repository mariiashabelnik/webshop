import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { currentProductId, currentProduct } from "../store/index";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./ProductInfo.css";

function ProductInfo() {
  const params = useParams();
  const setCurrentProductId = useSetRecoilState(currentProductId);

  useEffect(() => {
    setCurrentProductId(parseInt(params.productId, 10));
  });
  const productInfo = useRecoilValue(currentProduct);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <img
            className="productImg"
            src={productInfo.image}
            alt={productInfo.title}
          />
        </Grid>
        <Grid item md={6}>
          <Typography gutterBottom variant="h2" component="div">
            {productInfo.title}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography gutterBottom variant="h5" component="div">
            Information:
          </Typography>
          <Typography gutterBottom variant="body2">
            {productInfo.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Price:
          </Typography>
          <Typography gutterBottom variant="body2">
            € {productInfo.price}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductInfo;
