import Chatbot from "../../components/ChatBot/ChatBot";
import HomeBody from "./HomeBody/HomeBody";
import HomeFooter from "./HomeBody/HomeFooter";
import HomeIntro from "./HomeIntro";

const Home = () => {
    return (
        <div>
            <Chatbot />
            <HomeIntro />
            <HomeBody />
            {/* <HomeFooter /> */}
        </div>
    );
};

export default Home;
