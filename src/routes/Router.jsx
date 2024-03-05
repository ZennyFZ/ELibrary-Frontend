import { Navigate, createBrowserRouter } from "react-router-dom";
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
import Cart from "../pages/Cart/Cart";
import PDFViewer from "../pages/EBookViewer/PDFViewer";
import { AdminLayout } from "../layout/AdminLayout";
import isLogin from "../utils/isLogin";
import isAdmin from "../utils/isAdmin";
import CheckoutPage from "../pages/Cart/CheckoutPage";
import OrderDetails from "../pages/UserPage/OrderDetails";
import BookTrading from "../pages/BookTrading/BookTrading";
import Books from "../pages/Books/Books";
import Upload from "../pages/Upload/Upload";

export default createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <Error />,
    children: [
      {
        title: "Home",
        path: "/",
        element: <Home />
      },
      {
        title: "Login",
        path: "/login",
        element: <Login />
      },
      {
        title: "Register",
        path: "/register",
        element: <Register />
      },
      {
        title: "User Page",
        path: "/user/*",
        element: (await isLogin()) ? <UserPage /> : <Navigate to="/login" replace />
      },
      {
        title: "Order Detail",
        path: "/order/:id",
        element: (await isLogin()) ? <OrderDetails /> : <Navigate to="/login" replace />
      },
      //temp path for testing
      {
        title: "PDF Viewer",
        path: "/pdf",
        element: <PDFViewer />
      },
      {
        title: "Book Trading",
        path: "/booktrading",
        element: (await isLogin()) ? <BookTrading /> : <Navigate to="/login" replace />
      },
      {
        title: "Contact",
        path: "/contact",
        element: <HeaderContact />
      },
      {
        title: "About",
        path: "/about",
        element: <HeaderAbout />
      },
      {
        title: "Books",
        path: "/books",
        element: <Books />
      },
      {
        title: "Book",
        path: "/book/:id",
        element: <BookItem />
      },
      {
        title: "Cart",
        path: "/cart",
        element: <Cart />
      },
      {
        title: "Checkout",
        path: "/checkout",
        element: <CheckoutPage />
      }
    ]
  },
  {
    path: "/admin",
    element: (await isAdmin()) ? <AdminLayout /> : <Navigate to="/login" replace />,
    errorElement: <Error />,
    children: [
      {
        title: "ManageBook",
        path: "/admin/manageBook",
        element: <ManageBook />
      },
      {
        title: "ManageCategory",
        path: "/admin/manageCategory",
        element: <ManageCategory />
      }
    ]
  }
]);
