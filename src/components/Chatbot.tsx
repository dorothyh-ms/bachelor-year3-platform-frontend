import { useState, useEffect } from "react";
import useFetchChatbotAnswer, { useChatbot } from "../hooks/useChatbot.ts";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Paper,
    CircularProgress,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";


type ChatMessage =  {
    text: string;
    sender: "player" | "chatbot"
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatbotResponse, setChatbotResponse] = useState<string>();

    const { queryChatbot, isLoading, isError } = useChatbot();

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        const answer = queryChatbot(
            {
                "question" : input,
                "game" : "Battleship"
            }
        )
        setChatbotResponse(answer);
    }

    useEffect(() => {

    }, [])


    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                width: isOpen ? 300 : "auto",
                zIndex: 1000,
            }}
        >
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        cursor: "pointer",
                    }}
                    onClick={toggleChat}
                >
                    <Typography variant="h6">Chat with us!</Typography>
                    <IconButton color="inherit">
                        {isOpen ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
                    </IconButton>
                </Box>

                {isOpen && (
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                maxHeight: 300,
                                overflowY: "auto",
                                mb: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: msg.user ? "flex-end" : "flex-start",
                                        bgcolor: msg.user ? "primary.light" : "grey.300",
                                        color: msg.user ? "primary.contrastText" : "text.primary",
                                        p: 1,
                                        borderRadius: 1,
                                        maxWidth: "80%",
                                    }}
                                >
                                    {msg.text}
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={sendMessage}
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularProgress size={24} /> : "Send"}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Chatbot;
