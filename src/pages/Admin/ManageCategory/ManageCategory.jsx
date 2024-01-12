import React, { useEffect, useState } from "react";
import { getCategories } from "../../../apis/BookService";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState("");
  const [dataDialog, setDataDialog] = useState({});

  const columns = [
    { field: "STT", headerName: "#", align: "center", headerAlign: "center", width: 100 },
    { field: "name", headerName: "Category", flex: 1 },
    { field: "firstName", headerName: "Number of book", align: "center", headerAlign: "center", width: 200 },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      description: "Edit or Delete",
      type: "actions",
      flex: 0.5,
      getActions: (params) => {
        return [
          <>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                handleOpenDialog(params.row, "update");
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                handleOpenDialog(params.row, "delete");
              }}
              size="small"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </>,
        ];
      },
    },
  ];

  const handleOpenDialog = (params, type) => {
    if (type === "addnew") {
      setTypeDialog("addnew");
      setOpen(true);
      return;
    }
    setTypeDialog(type);
    setDataDialog(params);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataDialog({});
  };

  const updateCategoryList = (id, newName) =>
    categoryList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: newName,
        };
      }
      return item;
    });

  const getAllCategories = () => {
    getCategories().then((res) => {
      if (res.status === 200) {
        let temp = res.data.categoryList?.map((obj, index) => {
          return {
            STT: index + 1,
            id: obj._id,
            name: obj.name,
          };
        });
        setCategoryList(temp);
      }
    });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div>
      <h3 style={{ background: "#ababab", borderRadius: "12px 12px 0 0", textAlign: "center", padding: "12px" }}>Manage Category</h3>
      <div style={{ width: "90vw", padding: "20px 10px 40px 10px", margin: "auto" }}>
        <div style={{ textAlign: "left" }}>
          <Button
            onClick={() => {
              handleOpenDialog(null, "addnew");
            }}
            size="small"
            color="success"
            startIcon={<AddIcon />}
          >
            Add new category
          </Button>
        </div>
        <DataGrid
          rows={categoryList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const inputName = formJson.category;
            if (dataDialog.name === inputName) {
              handleClose();
              return;
            }
            if (typeDialog === "addnew") {
              let lastKeyTimestamp = 0;
              function generateUniqueKey() {
                const currentTimestamp = Date.now();
                if (currentTimestamp <= lastKeyTimestamp) {
                  lastKeyTimestamp += 1;
                } else {
                  lastKeyTimestamp = currentTimestamp;
                }
                return lastKeyTimestamp;
              }
              let temp = [{ id: generateUniqueKey().toString(), name: inputName }, ...categoryList];
              let newList = temp?.map(({ STT, ...obj }, index) => {
                return {
                  STT: index + 1,
                  ...obj,
                };
              });
              setCategoryList(newList);
              toast.success("Create category successfully!");
              handleClose();
              return;
            }
            if (typeDialog === "update") {
              let temp = updateCategoryList(dataDialog.id, inputName);
              setCategoryList(temp);
              toast.success("Update successfully!");
              handleClose();
              return;
            }
            if (typeDialog === "delete") {
              let temp = categoryList.filter((data) => {
                if (!dataDialog.id.includes(data.id)) {
                  return data;
                }
              });
              let newList = temp?.map(({ STT, ...obj }, index) => {
                return {
                  STT: index + 1,
                  ...obj,
                };
              });
              setCategoryList(newList);
              toast.success("Delete successfully!");
              handleClose();
            }
          },
        }}
      >
        <DialogTitle>
          {typeDialog === "addnew" ? "Create new category" : typeDialog === "update" ? "Update name of category" : "Delete category"}
        </DialogTitle>
        <DialogContent>
          {typeDialog === "delete" ? (
            <DialogContentText>Deleted data cannot be recovered. Are you sure you want to continue?</DialogContentText>
          ) : (
            <TextField
              autoFocus
              required
              margin="dense"
              id="category"
              name="category"
              label="Category name"
              fullWidth
              variant="standard"
              defaultValue={typeDialog === "addnew" ? "" : dataDialog.name}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {typeDialog === "delete" ? (
            <Button type="submit">Delete</Button>
          ) : (
            <Button type="submit">{typeDialog === "addnew" ? "Create" : "Update"}</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
