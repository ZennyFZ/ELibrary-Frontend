import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Slide,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../../../apis/CategoryService";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState("");
  const [dataDialog, setDataDialog] = useState({});

  const columns = [
    { field: "STT", headerName: "#", align: "center", headerAlign: "center", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "firstName", headerName: "Number Of Book", align: "center", headerAlign: "center", width: 300 },
    { field: "createdAt", headerName: "Create Date", align: "center", headerAlign: "center", width: 300 },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      description: "Edit or Delete",
      type: "actions",
      flex: 1,
      getActions: params => {
        return [
          <>
            <IconButton
              style={{ color: "#8F9BB3" }}
              onClick={() => {
                handleOpenDialog(params.row, "update");
              }}
            >
              <BorderColorOutlinedIcon />
            </IconButton>
            <IconButton
              style={{ color: "#8F9BB3", marginLeft: "10px" }}
              onClick={() => {
                handleOpenDialog(params.row, "delete");
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </>
        ];
      }
    }
  ];

  const handleOpenDialog = async (params, type) => {
    await new Promise(resolve => {
      if (type === "addnew") {
        setTypeDialog("addnew");
        setOpen(true);
      } else {
        setTypeDialog(type);
        setDataDialog(params);
        setOpen(true);
      }
      resolve();
    }).then(() => {
      if (type != "delete") {
        inputRef.current.focus();
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setDataDialog({});
  };

  const updateCategoryList = (id, newName) =>
    categoryList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: newName
        };
      }
      return item;
    });

  const getAllCategories = () => {
    getCategories().then(res => {
      if (res.status === 200) {
        let temp = res.data.categories?.map((obj, index) => {
          return {
            STT: index + 1,
            id: obj._id,
            name: obj.name
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
    <>
      <div style={{ color: "#4A85F6", fontSize: "24px", fontWeight: "700", margin: "0 0 15px 20px" }}>Category</div>
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
        <Button
          style={{
            minWidth: "170px",
            borderRadius: "16px",
            marginLeft: "26px",
            background: "#4A85F6",
            textTransform: "none"
          }}
          onClick={() => {
            handleOpenDialog(null, "addnew");
          }}
          size="large"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add category
        </Button>
      </div>

      <div style={{ background: "white", borderRadius: "16px", marginTop: "26px" }}>
        <div style={{ color: "#222B45", fontSize: "17px", fontWeight: "600", padding: "20px" }}>List Categories</div>
        <DataGrid
          sx={{
            height: "55vh",
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EFF4FA"
            }
          }}
          rows={categoryList.filter(item => item.name?.toLowerCase().includes(searchTable?.toLocaleLowerCase()))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 }
            }
          }}
          pageSizeOptions={[20, 40, 80]}
        />
        <Dialog
          onKeyUp={e => {
            let buttonDelete = document.getElementById("button-delete-dialog");
            if (e.keyCode === 13 && buttonDelete) {
              buttonDelete.click();
            }
          }}
          TransitionComponent={Transition}
          fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: event => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const inputName = formJson.category?.trim();
              if (dataDialog.name === inputName) {
                handleClose();
                return;
              }
              if (typeDialog === "addnew") {
                if (!inputName) {
                  toast.warning("Invalid input information!");
                  return;
                }
                addCategory(inputName)
                  .then(res => {
                    if (res.status === 200) {
                      let temp = [{ id: res.data.message, name: inputName }, ...categoryList];
                      let newList = temp?.map(({ STT, ...obj }, index) => {
                        return {
                          STT: index + 1,
                          ...obj
                        };
                      });
                      setCategoryList(newList);
                      toast.success("Category already successfully!");
                      handleClose();
                      return;
                    } else {
                      toast.error("Create category failed!");
                      handleClose();
                      return;
                    }
                  })
                  .catch(err => {
                    toast.error(err.response.data.message);
                    return;
                  });
              }
              if (typeDialog === "update") {
                if (!inputName) {
                  toast.warning("Invalid input information!");
                  return;
                }
                updateCategory(dataDialog.id, inputName)
                  .then(res => {
                    let temp = updateCategoryList(dataDialog.id, inputName);
                    setCategoryList(temp);
                    toast.success("Update successfully!");
                    handleClose();
                    return;
                  })
                  .catch(err => {
                    toast.error(err.response.data.message);
                    return;
                  });
              }
              if (typeDialog === "delete") {
                deleteCategory(dataDialog.id)
                  .then(res => {
                    if (res.status === 200) {
                      let temp = categoryList.filter(data => {
                        if (!dataDialog.id.includes(data.id)) {
                          return data;
                        }
                      });
                      let newList = temp?.map(({ STT, ...obj }, index) => {
                        return {
                          STT: index + 1,
                          ...obj
                        };
                      });
                      setCategoryList(newList);
                      toast.success(res.data.message);
                      handleClose();
                    }
                  })
                  .catch((err) => {
                    toast.error(err.response.data.message);
                    handleClose();
                  });
              }
            }
          }}
        >
          <DialogTitle>
            {typeDialog === "addnew"
              ? "Create new category"
              : typeDialog === "update"
              ? "Update name of category"
              : "Delete category"}
          </DialogTitle>
          <DialogContent>
            {typeDialog === "delete" ? (
              <DialogContentText>
                Deleted data cannot be recovered. Are you sure you want to continue?
              </DialogContentText>
            ) : (
              <TextField
                autoFocus
                required
                inputRef={inputRef}
                margin="dense"
                id="categoryInput"
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
              <Button id="button-delete-dialog" type="submit">
                Delete
              </Button>
            ) : (
              <Button type="submit">{typeDialog === "addnew" ? "Create" : "Update"}</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
