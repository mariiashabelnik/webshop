import { useRecoilValue } from "recoil";
import { useState } from "react";

import { products, uniqueCategories } from "../store/index";
import Product from "../components/Product";
import { Helmet } from "react-helmet";

import { MenuItem, Select, Grid } from "@mui/material";

function Products() {
  const productList = useRecoilValue(products);
  const categories = useRecoilValue(uniqueCategories);
  const [categoryFilter, setCategoryFilter] = useState("none");

  //filter of products
  const filterList = productList.filter((item) => {
    // if filter is set to none, return all
    if (categoryFilter === "none") {
      return true;
    }
    if (item.category === categoryFilter) {
      return true;
    } else {
      return false;
    }
  });

  const productUI = filterList.map((item) => {
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

  const filterItems = [];
  for (let item of categories) {
    filterItems.push(
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Webshop - Products</title>
      </Helmet>
      <Select
        value={categoryFilter}
        onChange={(e) => {
          setCategoryFilter(e.target.value);
        }}
      >
        <MenuItem value="none">Show all</MenuItem>
        {filterItems}
      </Select>
      <Grid container spacing={2}>
        {productUI}
      </Grid>
    </div>
  );
}

export default Products;
