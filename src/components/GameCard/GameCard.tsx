import React, {useState} from "react";
import {Alert, Button, Card, CardActions, CardContent, CardMedia, Chip, Snackbar, Typography,} from "@mui/material";
import {Game} from "../../types/Game"; // Correct path to `types/Game`
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useCreateLobby} from "../../hooks/useLobbies"; // Hook for creating lobbies

interface GameCardProps {
    game: Game;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
                                                      game,
                                                      isFavorite,
                                                      onToggleFavorite,
                                                  }) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarError, setSnackbarError] = useState(false);

    // Create Lobby hook
    const {createLobby} = useCreateLobby(() => {
        setSnackbarMessage("Successfully created lobby");
        setSnackbarError(false);
        setSnackBarOpen(true);
    });

    // Handle creating a new lobby
    const handleCreateLobby = () => {
        if (!game.id) {
            setSnackbarMessage("Invalid game data. Unable to create lobby.");
            setSnackbarError(true);
            setSnackBarOpen(true);
            return;
        }
        createLobby(game.id);
    };

    return (
        <Card className="game-card">
            <CardMedia
                component="img"
                height="140"
                image={game.image || "default_image_url"}
                alt={game.name}
            />
            <CardContent>
                <Typography variant="h5">{game.name}</Typography>
                <Typography variant="body2">{game.description}</Typography>
                <Chip label={game.genre || "Unknown genre"}/>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCreateLobby}
                    startIcon={<MeetingRoomIcon/>}
                >
                    New Lobby
                </Button>
                <Button
                    variant="outlined"
                    onClick={onToggleFavorite}
                    startIcon={isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                >
                    {isFavorite ? "Remove" : "Add"} Favorite
                </Button>
            </CardActions>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackBarOpen(false)}
                    severity={snackbarError ? "error" : "success"}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};
