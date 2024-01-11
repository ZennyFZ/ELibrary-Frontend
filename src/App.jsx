import { BrowserRouter } from 'react-router-dom'
import './App.css'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header'
import Router from './routes/Router'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
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
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
