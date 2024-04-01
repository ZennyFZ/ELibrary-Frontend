import React, { useEffect, useState } from "react";
import { getAllOrders, getOrderDetail } from "../../../apis/OrderService";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Slide,
  TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrdersDetail() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState({});
  const [dataOrderDetail, setDataOrderDetail] = useState({});
  const [searchTable, setSearchTable] = useState("");
  const handleGetDetailOrder = params => {
    setDataDialog(params);
    getOrderDetail(params.id)
      .then(res => {
        if (res.status === 200) {
          setDataOrderDetail(res.data[0]);
          setOpenDialog(true);
        }
        console.log("🚀 ~ handleGetDetailOrder ~ res.data[0]:", res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const columns = [
    { field: "STT", headerName: "#", align: "center", headerAlign: "center", width: 100 },
    { field: "userName", headerName: "Customer Name", align: "center", headerAlign: "center", width: 200 },
    { field: "userEmail", headerName: "Email", align: "center", headerAlign: "center", width: 200 },
    { field: "orderDate", headerName: "Order Date", align: "center", headerAlign: "center", width: 200 },
    { field: "totalPrice", headerName: "Total Price (VNĐ)", align: "center", headerAlign: "center", width: 170 },
    { field: "paymentMethod", headerName: "Payment method", align: "center", headerAlign: "center", width: 170 },
    {
      headerName: "Status Order",
      align: "center",
      headerAlign: "center",
      width: 100,
      renderCell: () => <CheckCircleIcon style={{ color: "green" }} />
    },
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
                handleGetDetailOrder(params.row);
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
          let temp = res.data?.map((obj, index) => {
            return {
              ...obj,
              STT: index + 1,
              id: obj._id,
              userName: obj.user.name,
              totalBooks: obj.user.bookList.length,
              userEmail: obj.user.email,
              totalPrice: obj.totalPrice.toLocaleString("vi-VN"),
              orderDate: moment(obj.orderDate).utc().format("DD/MM/YYYY HH:mm")
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
    <>
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

      <Dialog TransitionComponent={Transition} fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <HighlightOffIcon
          onClick={() => setOpenDialog(false)}
          className="absolute right-3 top-2 opacity-20 hover:text-red-500 hover:opacity-100 "
        />
        <DialogTitle>
          Order: {dataDialog?._id} - ({dataDialog?.orderDate})
        </DialogTitle>
        <DialogContent className="flex flex-col gap-y-2">
          <Divider>Books ordered</Divider>
          {dataOrderDetail?.bookList?.map((item, index) => {
            return (
              <Card
                key={index}
                onClick={() => {
                  window.open(`/book/${item._id}`, "_blank");
                }}
              >
                <CardActionArea>
                  <div className="flex flex-row">
                    <img className="w-28 h-28 object-cover" src={item.image} />
                    <div className="m-2 flex flex-col justify-between">
                      <div>
                        {item.title} - {item.author}
                      </div>
                      <div>Category: {item.category.name}</div>

                      <div className="font-bold">Price: {item.price.toLocaleString("vi-VN")} VNĐ</div>
                    </div>
                  </div>
                </CardActionArea>
              </Card>
            );
          })}
          <Divider>Ordered infor</Divider>
          <div className="opacity-70 leading-6 w-fit m-auto">
            <div>Customer name: {dataDialog?.user?.name}</div>
            <div>Email: {dataDialog?.user?.email}</div>
            <div>Phone number: {dataDialog?.user?.phone}</div>
            <div>Payment method: {dataDialog?.paymentMethod}</div>
            <div className="font-bold">Total Price: {dataDialog?.totalPrice} VNĐ</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
