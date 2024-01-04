import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Router from "./routes/Router";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <div>
                    <Router />
                </div>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
