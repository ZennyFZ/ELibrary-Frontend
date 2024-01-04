import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

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
    }
]

export default RouteData