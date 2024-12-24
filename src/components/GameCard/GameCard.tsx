import React, { useState, useContext } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Chip,
    Snackbar,
    Alert,
} from "@mui/material";
import { Game } from "../../types/Game";
import defaultGameImage from "../../assets/images/banditgames-mascot.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SecurityContext from "../../context/SecurityContext";
import { useCreateLobby } from "../../hooks/useLobbies";
import { useAddToFavorites, useRemoveFromFavorites } from "../../hooks/useFavorites";

interface GameCardProps {
    game: Game;
    isFavorite?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite = false }) => {
    const { loggedInUser } = useContext(SecurityContext); // Get the player ID from SecurityContext
    const playerId = loggedInUser?.playerId;

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackbarMessage, setSnackBarMessage] = useState("");
    const [snackbarError, setSnackbarError] = useState(false);

    console.log("Game ID:", game.id);
    console.log("Game object in GameCard:", game);
    console.log("Player ID from SecurityContext:", playerId);

    const { createLobby } = useCreateLobby(() => {
        setSnackBarMessage("Successfully created lobby");
        setSnackBarOpen(true);
        setSnackbarError(false);
    });

    const addToFavoritesMutation = useAddToFavorites();
    const removeFromFavoritesMutation = useRemoveFromFavorites();

    const handleFavoriteClick = () => {
        if (!playerId || !game.id) {
            setSnackBarMessage("Invalid player or game data.");
            setSnackBarOpen(true);
            setSnackbarError(true);
            return;
        }

        if (isFavorite) {
            removeFromFavoritesMutation.mutate(
                { playerId, gameId: game.id },
                {
                    onSuccess: () => {
                        setSnackBarMessage("Removed from Favorites");
                        setSnackBarOpen(true);
                        setSnackbarError(false);
                    },
                    onError: () => {
                        setSnackBarMessage("Failed to remove from Favorites");
                        setSnackBarOpen(true);
                        setSnackbarError(true);
                    },
                }
            );
        } else {
            addToFavoritesMutation.mutate(
                { playerId, gameId: game.id },
                {
                    onSuccess: () => {
                        setSnackBarMessage("Added to Favorites");
                        setSnackBarOpen(true);
                        setSnackbarError(false);
                    },
                    onError: () => {
                        setSnackBarMessage("Failed to add to Favorites");
                        setSnackBarOpen(true);
                        setSnackbarError(true);
                    },
                }
            );
        }
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="194"
                image={game.image ? game.image : defaultGameImage}
                alt={game.name}
            />
            <CardContent>
                <Typography variant="subtitle1">{game.name}</Typography>
                <Typography variant="body2">{game.description || "No description available"}</Typography>
                <Chip label={game.genre ? game.genre.toLocaleLowerCase() : "Unknown genre"} />
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => createLobby(game.id)}
                    color="secondary"
                    variant="contained"
                    endIcon={<MeetingRoomIcon />}
                >
                    New Lobby
                </Button>
                <Button
                    onClick={handleFavoriteClick}
                    color={isFavorite ? "error" : "primary"}
                    variant="outlined"
                    startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                >
                    {isFavorite ? "Remove" : "Favorite"}
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
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default GameCard;
