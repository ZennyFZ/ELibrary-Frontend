import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Box from "@mui/material/Box";

function createData(name, author, price, action) {
  return { name, author, price, action: "Remove" };
}

const rows = [
  createData("Frozen yoghurt", "nhandd", 159, "Remove"),
  createData("Ice cream sandwich", "taint", 237, "Remove"),
  createData("Eclair", "minhnq", 262, "Remove"),
  createData("Cupcake", "nhandd", 305, "Remove"),
];

export default function OrderPage() {
  return (
    <Box>
      <h1>My Order</h1>
      <Grid container spacing={3}>
        <Grid item sx={6}>
          <Paper>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete">
                        <Delete>{row.action}</Delete>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item sx={6}>
          <Paper>
            <Button variant="contained" color="success">
              Checkout Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
