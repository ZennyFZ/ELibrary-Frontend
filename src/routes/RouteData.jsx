import Home from "../pages/Home/Home";
import UserPage from "../pages/UserPage/UserPage";

const RouteData = [
  {
    title: "Home",
    path: "/",
    element: <Home />,
  },
  {
    title: "User Page",
    path: "/user",
    element: <UserPage />,
  },
];

export default RouteData;
