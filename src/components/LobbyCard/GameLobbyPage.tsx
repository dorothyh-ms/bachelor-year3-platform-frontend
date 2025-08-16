import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    TextField,
    Button,
    Stack,
    Avatar,
    Chip,
    Divider,
    Paper,
} from "@mui/material";
import { useEffect, useState, useContext, useCallback } from "react";
import { useLobby, useLeaveLobby } from "../../hooks/useLobbies";
import { useLobbyMessages } from "../../hooks/useLobbyMessages";
import { LobbyMessage } from "../../types/LobbyMessage";
import { useLobbyChat } from "../../hooks/useLobbyChat";
import SecurityContext from "../../context/SecurityContext";
import { PlayerSlimDto } from "../../types/Lobby";

const GameLobbyPage = () => {
    const { lobbyId } = useParams();
    const { lobby, isLoading: lobbyLoading } = useLobby(lobbyId);
    const { messages: initialMessages } = useLobbyMessages(lobbyId);

    const [messages, setMessages] = useState<LobbyMessage[]>([]);
    const [players, setPlayers] = useState<PlayerSlimDto[]>([]);
    const [input, setInput] = useState("");

    // Seed chat once
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    // Seed players once from loaded lobby
    useEffect(() => {
        if (!lobby) return;
        const list: PlayerSlimDto[] = [];
        if (lobby.initiatingPlayer) list.push(lobby.initiatingPlayer);
        if (lobby.joinedPlayer) list.push(lobby.joinedPlayer);
        setPlayers(list);
    }, [lobby]);

    // Handle incoming WS messages
    const handleChatMessage = useCallback((m: LobbyMessage) => {
        setMessages((prev) => [...prev, m]);

        // Keep sidebar in sync live
        if (m.type === "JOIN") {
            setPlayers((prev) => {
                if (prev.some((p) => p.playerId === m.senderId)) return prev;
                return [...prev, { playerId: m.senderId, username: m.senderName }];
            });
        } else if (m.type === "LEAVE") {
            setPlayers((prev) => prev.filter((p) => p.playerId !== m.senderId));
        }
    }, []);

    // Live chat socket
    const { sendChat } = useLobbyChat(lobbyId, handleChatMessage);

    const { loggedInUser } = useContext(SecurityContext);
    const { leaveLobby } = useLeaveLobby();

    const isPlayerInLobby = players.some((p) => p.playerId === loggedInUser?.playerId);

    if (lobbyLoading || !lobby) {
        return <Typography sx={{ p: 2 }}>Loading...</Typography>;
    }

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        sendChat(text, "CHAT");
        setInput("");
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1000,
                mx: "auto",
                mt: 2,
                display: "grid",
                gridTemplateColumns: { md: "1fr 340px" },
                gap: 2,
            }}
        >
            <Stack spacing={2}>
                <Card>
                    <CardMedia
                        component="img"
                        height="260"
                        image={lobby.game.image}
                        alt={lobby.game.name}
                    />
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h5">{lobby.game.name} — Lobby</Typography>
                        <Chip label={lobby.status ?? "OPEN"} />
                    </Box>
                </Card>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Lobby Chat
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack
                        spacing={1}
                        sx={{
                            minHeight: 240,
                            maxHeight: 360,
                            overflowY: "auto",
                            p: 1,
                            border: "1px solid #424255",
                            borderRadius: 1,
                        }}
                    >
                        {messages.map((m, idx) => (
                            <Box key={`${m.createdAt}-${idx}`}>
                                <Typography variant="caption" sx={{ opacity: 0.75 }}>
                                    {m.senderName} • {new Date(m.createdAt).toLocaleTimeString()}
                                </Typography>
                                <Typography variant="body2">{m.content}</Typography>
                            </Box>
                        ))}
                        {messages.length === 0 && (
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                No messages yet. Say hi! 👋
                            </Typography>
                        )}
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <TextField
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            fullWidth
                            placeholder="Type a message..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />
                        <Button variant="contained" onClick={handleSend}>
                            Send
                        </Button>
                    </Stack>
                </Paper>

                {isPlayerInLobby && (
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => leaveLobby(lobby.id)}
                    >
                        Leave Lobby
                    </Button>
                )}
            </Stack>

            <Paper sx={{ p: 2, height: "fit-content" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Players in this lobby
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    {players.map((p) => (
                        <Stack key={p.playerId} direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ width: 36, height: 36 }}>
                                {p.username?.charAt(0)?.toUpperCase() ?? "P"}
                            </Avatar>
                            <Typography>{p.username}</Typography>
                        </Stack>
                    ))}
                    {players.length < 2 && (
                        <Typography variant="body2" sx={{ opacity: 0.85 }}>
                            Waiting for another player to join…
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default GameLobbyPage;