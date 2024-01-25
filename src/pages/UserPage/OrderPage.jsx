import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { getOrderByUserId } from "../../apis/OrderService";
import { getCurrentUser } from "../../apis/UserService";

export default function OrderPage() {
  const [order, setOrder] = React.useState([]);
  const fetchData = async () => {
    try {
      const user = await getCurrentUser();
      const userId = user.data.user._id;
      const orderData = await getOrderByUserId(userId);
      setOrder(orderData.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <h1>My Order</h1>
      <Grid>
        <Paper>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Payment Method</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                order.map(data => (
                  <TableRow key={data} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {data._id}
                    </TableCell>
                    <TableCell align="right">{data?.orderDate?.split("T")[0]}</TableCell>
                    <TableCell align="right">{data.totalPrice}</TableCell>
                    <TableCell align="right">{data.paymentMethod}</TableCell>
                    <TableCell align="right">
                      <Link to={`/order/${data._id}`}>
                        <Button variant="contained" color="primary">
                          View Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Box>
  );
}
