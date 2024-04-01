import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../apis/OrderService";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function OrdersDetail() {
  const [orders, setOrders] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const columns = [
    { field: "STT", headerName: "#", align: "center", headerAlign: "center", width: 100 },
    { field: "userName", headerName: "Customer Name", align: "center", headerAlign: "center", width: 200 },
    { field: "userEmail", headerName: "Email", align: "center", headerAlign: "center", width: 200 },
    { field: "orderDate", headerName: "Order Date", align: "center", headerAlign: "center", width: 200 },
    { field: "totalBooks", headerName: "Total Books Order", align: "center", headerAlign: "center", width: 150 },
    { field: "totalPrice", headerName: "Total Price (VNĐ)", align: "center", headerAlign: "center", width: 170 },
    { field: "paymentMethod", headerName: "Payment method", align: "center", headerAlign: "center", width: 170 },
    {
      field: "action",
      headerName: "Detail",
      align: "center",
      headerAlign: "center",
      description: "Detail",
      type: "actions",
      flex: 1,
      getActions: params => {
        return [
          <>
            <IconButton
              style={{ color: "#8F9BB3" }}
              onClick={() => {
                console.log(params.row);
                //   handleOpenDialog(params.row);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </>
        ];
      }
    }
  ];
  useEffect(() => {
    getAllOrders()
      .then(res => {
        if (res.status === 200) {
          console.log("🚀 ~ temp ~ temp:", res.data);

          let temp = res.data?.map((obj, index) => {
            return {
              ...obj,
              STT: index + 1,
              id: obj._id,
              userName: obj.user.name,
              totalBooks: obj.user.bookList.length,
              userEmail: obj.user.email,
              totalPrice: obj.totalPrice.toLocaleString("vi-VN"),
              orderDate: moment(obj.orderDate).format("DD-MM-YYYY HH:mm")
            };
          });
          setOrders(temp);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div style={{ color: "#4A85F6", fontSize: "24px", fontWeight: "700", margin: "0 0 15px 20px" }}>Orders</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          onChange={e => {
            setSearchTable(e.target.value);
          }}
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              borderRadius: "16px",
              background: "white",
              width: "100%"
            }
          }}
        />
      </div>

      <div style={{ background: "white", borderRadius: "16px", marginTop: "26px" }}>
        <div style={{ color: "#222B45", fontSize: "17px", fontWeight: "600", padding: "20px" }}>List Orders</div>
        <DataGrid
          sx={{
            height: "55vh",
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EFF4FA"
            }
          }}
          rows={orders.filter(item => item.userName?.toLowerCase().includes(searchTable?.toLocaleLowerCase()))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 }
            }
          }}
          pageSizeOptions={[20, 40, 80]}
        />
      </div>
    </div>
  );
}
