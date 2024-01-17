import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import vnLang from "./language/vn.json";

i18next.init({
  interpolation: { escapeValue: false },
  resources: {
    vn: {
      global: vnLang.global,
      AboutPage: vnLang.AboutPage,
    },
  },
  lng: "en",
  fallbackLng: "en",
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
)
