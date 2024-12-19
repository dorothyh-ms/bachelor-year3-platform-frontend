import "../App.css";
import React, { useState, useEffect } from 'react';
import useFetchChatbotAnswer from "../hooks/useFetchAnswer.ts";
import {useFetchGames} from "../hooks/useGames.ts"

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedGame, setSelectedGame] = useState("platform");


    const hardcodedGame = { id: "0", name: "platform" };
    const { data: fetchedOptions = [], refetch } = useFetchGames();
    const dropdownOptions = [hardcodedGame, ...fetchedOptions]

    const {loading, response, error, postRequest} = useFetchChatbotAnswer(
        input.trim(),  // Replace with your API endpoint
        selectedGame  // Send the input message
    );

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen){
            refetch()
        }
    };

    const sendMessage = async () => {

        if (!input.trim()) return; // Do nothing if the input is empty

        setInput("");
        // Add the user's message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            {user: true, text: input},
        ]);

        try {
            setMessages((prevMessages) => [
                ...prevMessages,
                {user: false, text: "Bot is typing..."},
            ]);
            // Trigger the postRequest to send the message
            await postRequest();

            // If there's an error, add an error message to the chat
            if (error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {user: false, text: `Error: ${error}`},
                ]);
            }
        } catch (err) {
            // Handle unexpected errors
            console.error('Error sending message:', err);
            setMessages((prevMessages) => [
                ...prevMessages,
                {user: false, text: 'An error occurred. Please try again later.'},
            ]);
        } finally {
            // Clear the input field after sending the message
            setInput('');
        }
    };

    // Handle response updates using useEffect
    useEffect(() => {
        if (response) {
            setMessages((prevMessages) => {
                // Remove the "Bot is typing..." message (last message)
                const updatedMessages = prevMessages.slice(0, -1);

                // Add the actual bot response
                return [
                    ...updatedMessages,
                    {user: false, text: response.answer}, // Assuming API returns { answer: 'Bot reply' }
                ];
            });
        }
    }, [response]); // Runs when `response` changes

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <div className="chatbot-header" onClick={toggleChat}>
                <h4>Chat with us!</h4>
            </div>
            {isOpen && (
                <div className="chatbot-body">
                    {/* Sticky Dropdown Menu */}
                    <div className="chatbot-dropdown">
                        <select
                            onChange={(e) => setSelectedGame(e.target.value)}
                            value={selectedGame}>
                            <option value="" disabled>
                                Select the subject of your question
                            </option>
                            {dropdownOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${msg.user ? 'user-message' : 'bot-message'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage} disabled={loading}>
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

    export default Chatbot;