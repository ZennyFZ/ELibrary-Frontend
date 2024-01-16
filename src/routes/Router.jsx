import { createBrowserRouter } from "react-router-dom";
import HeaderAbout from "../components/Header/HeaderList/HeaderAbout";
import HeaderContact from "../components/Header/HeaderList/HeaderContact";
import BookItem from "../pages/Home/BookItem/BookItem";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserPage from "../pages/UserPage/UserPage";
import UserLayout from "../layout/UserLayout";
import Error from "../pages/Error/Error";
import ManageCategory from "../pages/Admin/ManageCategory/ManageCategory";
import ManageBook from "../pages/Admin/ManageBook/ManageBook";
import { AdminLayout } from "../layout/AdminLayout";

export default createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <Error />,
        children: [
            {
                title: "Home",
                path: "/",
                element: <Home />,
            },
            {
                title: "Login",
                path: "/login",
                element: <Login />,
            },
            {
                title: "Register",
                path: "/register",
                element: <Register />,
            },
            {
                title: "User Page",
                path: "/user",
                element: <UserPage />,
            },
            {
                title: "Contact",
                path: "/contact",
                element: <HeaderContact />,
            },
            {
                title: "About",
                path: "/about",
                element: <HeaderAbout />,
            },
            {
                title: "Book",
                path: "/book/:id",
                element: <BookItem />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <Error />,
        children: [
            {
                title: "ManageBook",
                path: "/admin/manageBook",
                element: <ManageBook />,
            },
            {
                title: "ManageCategory",
                path: "/admin/manageCategory",
                element: <ManageCategory />,
            },
        ],
    },
]);
