import { useRecoilValue } from "recoil";
import { products } from "../store/index";
import Product from "../components/Product";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet";

function Products() {
  const productList = useRecoilValue(products);
  console.log("productList", productList);

  const productUI = productList.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <Product
          title={item.title}
          image={item.image}
          price={item.price}
          id={item.id}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Helmet>
        <title>Mariia webshop - Products</title>
      </Helmet>
      <Grid container spacing={2}>
        {productUI}
      </Grid>
    </div>
  );
}

export default Products;
