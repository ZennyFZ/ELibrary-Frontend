import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { useTranslation } from "react-i18next";



export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    let clientLanguage = localStorage.getItem("language");
    clientLanguage ? i18n.changeLanguage(clientLanguage) : null;
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={Router} />
    </>
  );
}
