import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderDetail } from "../../apis/OrderService";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";

function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchData = async () => {
    try {
      const orderData = await getOrderDetail(id);
      setOrderDetails(orderData.data[0]);
      console.log(orderData.data[0]);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/user">
        <Button style={{ margin: "1%" }} variant="contained">
          Go Back
        </Button>
      </Link>

      <TableContainer component={Paper} style={{ margin: "5%", width: "90%", marginTop: "1%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails &&
              orderDetails.bookList?.map(
                order => (
                  console.log(order),
                  (
                    <TableRow>
                      <TableCell>
                        <img style={{ width: "120px", height: "120px" }} src={order?.image} alt="" />
                      </TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.title}</TableCell>
                      <TableCell>{order.price}</TableCell>
                    </TableRow>
                  )
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderDetails;
