import HeaderAbout from "../components/Header/HeaderList/HeaderAbout";
import HeaderContact from "../components/Header/HeaderList/HeaderContact";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserPage from "../pages/UserPage/UserPage";

const RouteData = [
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
];

export default RouteData;
