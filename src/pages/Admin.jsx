import React from "react";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import { products, allUsers } from "../store/index";

//mui import
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columnsProducts = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    type: "number",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 75,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "rating",
    headerName: "Rate",
    width: 150,
    valueGetter: (params) => params.row.rating.rate,
  },
  {
    field: "count",
    headerName: "Count",
    width: 150,
    valueGetter: (params) => params.row.rating.count,
  },
];

const columnsUsers = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    type: "number",
  },
  {
    field: "role",
    headerName: "Role",
    width: 50,
    valueGetter: (params) => params.row.role,
  },
  {
    field: "lastname",
    headerName: "Name",
    width: 200,
    valueGetter: (params) =>
      `${params.row.name.firstname || ""} ${params.row.name.lastname || ""}`,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
    valueGetter: (params) => params.row.address.city,
  },
  {
    field: "street",
    headerName: "Street",
    width: 200,
    valueGetter: (params) => params.row.address.street,
  },
  {
    field: "number",
    headerName: "Number",
    width: 50,
    type: "number",
    valueGetter: (params) => params.row.address.number,
  },
  {
    field: "zipcode",
    headerName: "Zipcode",
    width: 100,
    type: "number",
    valueGetter: (params) => params.row.address.zipcode,
  },
];

function Admin() {
  const productList = useRecoilValue(products);
  const userList = useRecoilValue(allUsers);

  return (
    <div>
      <Helmet>
        <title>Webshop - Admin</title>
      </Helmet>

      <Paper elevation={4} sm={{ width: "50%" }} xs={{ width: "50%" }}>
        <Typography variant="h5" pl={2} pr={2} pt={2}>
          Products
        </Typography>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={productList}
            columns={columnsProducts}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Paper>

      <Paper elevation={4} sm={{ width: "50%" }} xs={{ width: "50%" }}>
        <Typography variant="h5" pl={2} pr={2} pt={2}>
          Users
        </Typography>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={userList}
            columns={columnsUsers}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Paper>
    </div>
  );
}

export default Admin;
