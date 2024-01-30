import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { getBooks, getCategories } from "../../apis/BookService";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Cart/CartSlice";

export default function BookTrading() {
  const { t } = useTranslation("BooksPage");
  const [categories, setCategories] = useState([]);
  const [booksInit, setBooksInit] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [filter, setFilter] = useState({ categories: [], language: [] });
  const [searchBooks, setSearchBooks] = useState("");
  const [sortBooks, setSortBooks] = useState("");
  const dispatch = useDispatch();

  const handleAddToCart = book => {
    dispatch(addToCart(book));
  };

  const handleFilter = (key, e) => {
    let temp = { ...filter };
    if (key === "language") {
      e.target.checked
        ? (temp.language = [...temp.language, e.target.name])
        : (temp.language = temp.language.filter(item => item !== e.target.name));
    }
    if (key === "categories") {
      e.target.checked
        ? (temp.categories = [...temp.categories, e.target.name])
        : (temp.categories = temp.categories.filter(item => item !== e.target.name));
    }
    setFilter(temp);
    if (temp.language.length === 0 && temp.categories.length === 0) {
      handleSort(sortBooks, booksInit);
      return;
    }
    if (temp.language.length > 0 && temp.categories.length > 0) {
      const filterAll = booksInit.filter(book => {
        return Object.entries(temp).every(([key, values]) => {
          return key === "categories" ? values.includes(book.category._id) : values.includes(book[key]);
        });
      });
      handleSort(sortBooks, filterAll);
    } else {
      const filterAll = booksInit.filter(book => {
        return Object.entries(temp).some(([key, values]) => {
          return key === "categories" ? values.includes(book.category._id) : values.includes(book[key]);
        });
      });
      handleSort(sortBooks, filterAll);
    }
  };

  const handleSort = (sortBy, listSort) => {
    let temp = listSort ? [...listSort] : [...booksList];

    if (!sortBy) {
      setSortBooks("");
      setBooksList(temp);
      return;
    }

    setSortBooks(sortBy);
    const collator = new Intl.Collator("vi", { sensitivity: "base" });
    if (sortBy === "latest") {
      temp.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } else if (sortBy === "atoz") {
      temp.sort((a, b) => collator.compare(a.title, b.title));
    } else if (sortBy === "ztoa") {
      temp.sort((a, b) => collator.compare(b.title, a.title));
    } else if (sortBy === "lowToHigh") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      temp.sort((a, b) => b.price - a.price);
    }
    setBooksList(temp);
  };

  useEffect(() => {
    getCategories()
      .then(result => {
        if (result.status === 200) {
          setCategories(result.data.categoryList);
        }
      })
      .catch(err => {
        console.log(err);
      });
    getBooks()
      .then(result => {
        if (result.status === 200) {
          setBooksInit(result.data.bookList);
          setBooksList(result.data.bookList);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="grid grid-cols-6 bg-[#77777714] pt-4">
        <div className="mx-auto bg-white h-fit rounded-lg w-3/4 p-[20px_20px_50px_20px] shadow-xl">
          <div className="">
            <div className="font-bold text-16 mb-2">{t("Category")}</div>
            <FormGroup>
              {categories.map((data, index) => {
                return (
                  <div key={index} className="m-0">
                    <FormControlLabel
                      control={<Checkbox size="small" onChange={e => handleFilter("categories", e)} name={data._id} />}
                      label={<div className="text-14">{t(data.name)}</div>}
                    />
                  </div>
                );
              })}
            </FormGroup>

            <div className="font-bold text-16 mb-2 mt-4">{t("Language")}</div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox size="small" onChange={e => handleFilter("language", e)} name="Tiếng Anh" />}
                label={<div className="text-14">{t("English")}</div>}
              />
              <FormControlLabel
                control={<Checkbox size="small" onChange={e => handleFilter("language", e)} name="Tiếng Việt" />}
                label={<div className="text-14">{t("Vietnamese")}</div>}
              />
            </FormGroup>
          </div>
        </div>
        <div className="col-span-5">
          <div className="flex justify-between m-[0_10px_0_10px]">
            <TextField
              onChange={e => {
                setSearchBooks(e.target.value);
              }}
              size="small"
              placeholder={t("Search")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  background: "white",
                  fontSize: "12px"
                }
              }}
            />
            <FormControl size="small">
              <InputLabel id="sort-by" sx={{ fontSize: "12px" }}>
                {t("Sort by")}
              </InputLabel>
              <Select
                labelId="sort-by"
                id="sort-by-select"
                value={sortBooks}
                label={t("Sort by")}
                sx={{ background: "white", minWidth: "7rem", fontSize: "12px" }}
                onChange={e => handleSort(e.target.value)}
              >
                <MenuItem sx={{ fontSize: "12px" }} value="latest">
                  {t("Latest")}
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value="atoz">
                  {t("A to Z")}
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value="ztoa">
                  {t("Z to A")}
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value="lowToHigh">
                  {t("Price low to high")}
                </MenuItem>{" "}
                <MenuItem sx={{ fontSize: "12px" }} value="highToLow">
                  {t("Price high to low")}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-4 gap-[40px_30px] p-[10px]">
            {booksList.length > 0 ? (
              booksList
                .filter(item => item.title?.toLowerCase().includes(searchBooks?.toLocaleLowerCase()))
                .map((data, index) => {
                  return (
                    <Card key={index} sx={{ borderRadius: "15px" }}>
                      <CardActionArea className="h-[400px]">
                        <img className="h-[250px] w-full" src={data.image} alt="green iguana" />
                        <CardContent>
                          <div className="font-bold">
                            {data.title} - {data.author}
                          </div>
                          <div className="line-clamp-3 text-[#00000087] mt-2">{data.description}</div>
                          <div className="mt-2 text-red-300 font-bold absolute bottom-0">
                            {data.price.toLocaleString("vi-VN")} VND
                          </div>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className="justify-between">
                        <Link to={`/book/${data._id}`}>
                          <Button size="small">{t("Detail")}</Button>
                        </Link>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            handleAddToCart(data);
                          }}
                        >
                          {t("Add to card")}
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
            ) : (
              <div className="text-gray">{t("No data")}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
