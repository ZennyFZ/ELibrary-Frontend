import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import UserPage from "../pages/UserPage/UserPage";

const RouteData = [
    {
        title: 'Home',
        path: '/',
        element: <Home />,
    },
    {
        title: 'Login',
        path: '/login',
        element: <Login />,
    },
    {
        title: 'Register',
        path: '/register',
        element: <Register />,
    },
    {
    title: "User Page",
    path: "/user",
    element: <UserPage />,
    },
]

export default RouteData;