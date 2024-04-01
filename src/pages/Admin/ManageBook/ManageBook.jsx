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
  TextField,
  Container,
  Stack,
  Autocomplete
} from "@mui/material";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { addBook, deleteBook, getBooks, updateBook } from "../../../apis/BookService";
import { getCategories } from "../../../apis/CategoryService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import moment from 'moment'
export default function ManageBook() {
  const [bookList, setBookList] = useState([]);
  const [categoriList, setCategoryList] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState("");
  const [selectCategory, setSelectCategory] = useState('');
  const [dataDialog, setDataDialog] = useState({});

  const columns = [
    { field: "STT", headerName: "#", align: "center", headerAlign: "center", width: 100 },
    { field: "title", headerName: "Title", headerAlign: "center", width: 200 },
    { field: "author", headerName: "Author", align: "center", headerAlign: "center", width: 300 },
    { field: "publisher", headerName: "Publisher", align: "center", headerAlign: "center", width: 300 },
    { field: "publishDate", headerName: "Published Date", align: "center", headerAlign: "center", width: 150 },
    { field: "pages", headerName: "No.Page", align: "center", headerAlign: "center", width: 100 },
    { field: "language", headerName: "Language", align: "center", headerAlign: "center", width: 150 },
    { field: "price", headerName: "Price", align: "center", headerAlign: "center", width: 100 },
    { field: "image", headerName: "Image", align: "center", headerAlign: "center", width: 300 },
    { field: "description", headerName: "Description", align: "center", headerAlign: "center", width: 300 },
    { field: "category", headerName: "Category", align: "center", headerAlign: "center", width: 300 },
    { field: "file", headerName: "File", align: "center", headerAlign: "center", width: 300 },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      description: "Edit or Delete",
      type: "actions",
      width: 300,
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
        inputRef.current?.focus();
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setDataDialog({});
  };

  const getAllBooks = () => {
    getBooks().then(res => {
      if (res.status === 200) {
        let temp = res.data?.bookList?.map((obj, index) => {
          return {
            STT: index + 1,
            id: obj._id,
            title: obj.title,
            author: obj.author,
            publisher: obj.publisher,
            publishDate: obj.publishDate,
            pages: obj.pages,
            language: obj.language,
            price: obj.price,
            image: obj.image,
            description: obj.description,
            category: obj?.category?.name,
            file: obj.file
          }
        })
        setBookList(temp);
      }
    })
  };

  useEffect(() => {
    getAllBooks();
    getCategories().then(res => {
      if (res.status === 200) {
        let temp = res.data.categories?.map((obj, index) => {
          return {
            id: obj._id,
            name: obj.name
          };
        });
        setCategoryList(temp);
      }
    });
  }, []);

  return (
    <>
      <div style={{ color: "#4A85F6", fontSize: "24px", fontWeight: "700", margin: "0 0 15px 20px" }}>Books</div>
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
          Add Book
        </Button>
      </div>

      <div style={{ background: "white", borderRadius: "16px", marginTop: "26px" }}>
        <div style={{ color: "#222B45", fontSize: "17px", fontWeight: "600", padding: "20px" }}>List Books</div>
        <DataGrid
          sx={{
            height: "55vh",
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EFF4FA"
            }
          }}
          rows={bookList.filter(item => item.title?.toLowerCase().includes(searchTable?.toLocaleLowerCase()))}
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
              console.log('dataDialog', dataDialog)
              console.log('booklist', bookList)
              console.log('categoriList', categoriList)
              const formData = new FormData(event.currentTarget);
              if (typeDialog === "addnew") {
              console.log('selectCategory', selectCategory)

                const formJson = {
                  ...Object.fromEntries(formData.entries()),
                  category: categoriList?.filter(e => e.name == selectCategory)[0].id
                };
                if (!Object.keys(formJson).length) {
                  toast.warning("Invalid input information!");
                  return;
                }
                console.log('formJson', formJson);

                addBook(formJson.title, formJson.author, formJson.publisher, formJson.publishDate, formJson.pages, formJson.language, formJson.price, formJson.image, formJson.description, formJson.category, formJson.file)
                  .then(res => {
                    if (res.status === 200) {
                      // let temp = [{ id: res.data.message, name: inputName }, ...categoryList];
                      // let newList = temp?.map(({ STT, ...obj }, index) => {
                      //   return {
                      //     STT: index + 1,
                      //     ...obj
                      //   };
                      // });
                      // setCategoryList(newList);
                      console.log('res', res);
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
                    console.log(err)
                    toast.error(err.response.data.message);
                    return;
                  });
              }
              if (typeDialog === "update") {
                const formJson = {
                  ...Object.fromEntries(formData.entries()),
                  category: categoriList?.filter(e => e.name == dataDialog.category)[0].id
                };
                updateBook(dataDialog.id, formJson.title, formJson.author, formJson.publisher, formJson.publishDate, formJson.pages, formJson.language, formJson.price, formJson.image, formJson.description, formJson.category, formJson.file)
                  .then(res => {
                    // let temp = updateBookList(dataDialog.id, inputName);
                    // setCategoryList(temp);
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
                deleteBook(dataDialog.id)
                  .then(res => {
                    if (res.status === 200) {
                      let temp = bookList.filter(data => {
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
              ? "Create new book"
              : typeDialog === "update"
                ? "Update book"
                : "Delete book"}
          </DialogTitle>
          <DialogContent>
            {typeDialog === "delete" ? (
              <DialogContentText>
                Deleted data cannot be recovered. Are you sure you want to continue?
              </DialogContentText>
            ) : (
              <Stack spacing={1}>
                <Stack direction='row' spacing={2}>
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='title'
                    name='title'
                    label='Title'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.title}
                  />
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='author'
                    name='author'
                    label='Author'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.author}
                  />
                </Stack>
                <Stack direction='row' spacing={2}>
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='publisher'
                    name='publisher'
                    label='Publisher'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.publisher}
                  />
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='publishDate'
                    name='publishDate'
                    label='Ngày xuất bản'
                    fullWidth
                    type="datetime-local"
                    variant="standard"
                    defaultValue={
                      typeDialog === "addnew"
                        ? moment().format("YYYY-MM-DDTHH:mm")
                        : moment(dataDialog.publishDate).format("YYYY-MM-DDTHH:mm")
                    }
                  />
                </Stack>
                <Stack direction='row' spacing={2}>
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='pages'
                    name='pages'
                    label='No.Page'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.pages}
                  />
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='language'
                    name='language'
                    label='Language'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.language}
                  />
                </Stack>
                <Stack direction='row' spacing={2}>
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='price'
                    name='price'
                    label='Price'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.price}
                  />
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='image'
                    name='image'
                    label='Image'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.image}
                  />
                </Stack>
                <Stack direction='row' spacing={2}>
                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='description'
                    name='description'
                    label='Description'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? '' : dataDialog.description}
                  />
                  <Autocomplete
                    options={categoriList.map(e => {
                      return {
                        label: e.name,
                        id: e._id
                      }
                    })}
                    id='category'
                    onChange={(event, newValue) => {
                      setSelectCategory(newValue.label);
                    }}
                    fullWidth
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.category}
                    renderInput={(params) => (
                      <TextField  {...params} label="Category" placeholder="Category" />
                    )}
                  />
                </Stack>
                <Stack direction='row' spacing={2}>

                  <TextField
                    autoFocus
                    required
                    inputRef={inputRef}
                    margin="dense"
                    id='file'
                    name='file'
                    label='File'
                    fullWidth
                    variant="standard"
                    defaultValue={typeDialog === "addnew" ? "" : dataDialog.file}
                  />
                </Stack>
              </Stack>)}
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
