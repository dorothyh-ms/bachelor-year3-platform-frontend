import { useState, useEffect } from "react";
import { useChatbot } from "../hooks/useChatbot.ts";
import { useFetchGames } from "../hooks/useGames.ts";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

type ChatMessage = {
    text: string;
    sender: "player" | "chatbot";
};



const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [playerQuestion, setPlayerQuestion] = useState<string>();
    const [chatbotResponse, setChatbotResponse] = useState<string>();
    const [selectedSubject, setSelectedSubject] = useState<string>("platform");
    const [chatSubjectOptions, setChatSubjectOptions] = useState<string[]>([]);

    // Fetch games using the useFetchGames hook
    const { games } = useFetchGames();



    useEffect(() => {
        if (games && games.length) {
            setChatSubjectOptions([
                "platform",
                ...games.map(game => game.name)
            ])
        }


    }, [games])

    const handleSuccessfulChatbotResponse = (response: string) => {
        setChatbotResponse(response);
    };

    const { queryChatbot, isLoading, isError } = useChatbot(handleSuccessfulChatbotResponse);

    useEffect(() => {
        if (chatbotResponse) {
            setMessages((prev) => [
                ...prev,
                {
                    text: chatbotResponse,
                    sender: "chatbot",
                },
            ]);
        }
    }, [chatbotResponse]);

    const toggleChat = () => {
        setIsOpen(!isOpen);

    };

    const sendMessage = () => {
        if (!selectedSubject) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Please select a game before asking a question.",
                    sender: "chatbot",
                },
            ]);
            return;
        }

        setPlayerQuestion(input);
        queryChatbot({
            question: input,
            game: selectedSubject, // Include the selected game in the query
        });
        setInput("");
    };

    useEffect(() => {
        if (playerQuestion) {
            setMessages((prev) => [
                ...prev,
                {
                    text: playerQuestion,
                    sender: "player",
                },
            ]);
        }
    }, [playerQuestion]);

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
                        {/* Dropdown for Game Selection */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="game-select-label">Select chat subject</InputLabel>
                            <Select
                                labelId="game-select-label"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select the subject of your question
                                </MenuItem>
                                {chatSubjectOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option[0].toUpperCase() + option.substring(1).toLowerCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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
                            {isError &&
                                <Box
                                    
                                    sx={{
                                        alignSelf:"flex-start",
                                        bgcolor: "error.light",
                                        color: "black",
                                        p: 1,
                                        borderRadius: 1,
                                        maxWidth: "80%",
                                    }}
                                >
                                    Chatbot is unavailable. Please try again later.
                                </Box>}
                            {!isError && messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        alignSelf: msg.sender === "player" ? "flex-end" : "flex-start",
                                        bgcolor: msg.sender === "player" ? "primary.light" : "grey.300",
                                        color: msg.sender === "player" ? "primary.contrastText" : "black",
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
