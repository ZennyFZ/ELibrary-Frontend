import './ChatBot.scss';
import axios from 'axios';

const Chatbot = () => {

    const generateResponse = (incomingChatLi, userMessage) => {
        const apiKey = "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"
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = incomingChatLi.querySelector("p");
        const requestOptions = {
              model: 'gpt-3.5-turbo-1106',
              messages: [{ role: 'user', content: userMessage }],
          };

          const client = axios.create({
            headers: {
              Authorization: "Bearer " + apiKey,
            },
          });
          
          client
            .post(API_URL, requestOptions)
            .then((response) => {
              const data = response.data;
              console.log(data.choices[0].message.content.trim());
              const botResponse = data.choices[0].message.content.trim();
              messageElement.textContent = botResponse;
            })
            .catch(() => {
              messageElement.classList.add('error');
              messageElement.textContent = 'Oops! Something went wrong. Please try again.';
            })
    }

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chatbot__chatbox__chat", `${className}`);
        let chatContent = className === "chatbot__chatbox__outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }

    const toggleChatBot = () => {
        document.body.classList.toggle("show-chatbot")
    };

    const handleChat = () => {
        let chatbox = document.querySelector(".chatbot__chatbox");
        let chatInput = document.querySelector(".chatbot__chat-input textarea");
        let userMessage = chatInput.value.trim();
        if (!userMessage) return;
        chatInput.value = "";
        chatInput.style.height = `${chatInput.scrollHeight}px`;
        chatbox.appendChild(createChatLi(userMessage, "chatbot__chatbox__outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "chatbot__chatbox__incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, userMessage);
        }, 600);
    }

    return (
        <div>
            <button id="chatbot-toggler" className="chatbot-toggler" onClick={toggleChatBot}>
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="chatbot">
                <header>
                    <h2>ELibrary Chat Bot</h2>
                    <span id="close-btn" className="close-btn material-symbols-outlined" onClick={toggleChatBot}>
                        close
                    </span>
                </header>
                <ul className="chatbot__chatbox">
                    <li className="chatbot__chatbox__chat chatbot__chatbox__incoming">
                        <span className="material-symbols-outlined">smart_toy</span>
                        <p>Hi there 👋<br />How can I help you today?</p>
                    </li>
                </ul>
                <div className="chatbot__chat-input">
                    <textarea
                        placeholder="Enter a message..."
                        spellCheck="false"
                        required
                    ></textarea>
                    <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
                        send
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;