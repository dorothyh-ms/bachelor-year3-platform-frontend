import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { useFavorites } from "../hooks/useFavorites";
import GameCard from "../components/GameCard/GameCard";
import { useContext } from "react";
import SecurityContext from "../context/SecurityContext";

const FavoritesPage = () => {
    const { loggedInUser } = useContext(SecurityContext);
    const playerId = loggedInUser?.playerId || "";

    const { data: favorites, isLoading, isError } = useFavorites(playerId);

    if (isLoading) return <CircularProgress />;
    if (isError) {
        return (
            <Typography color="error">
                Failed to fetch favorite games. Try again later.
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Favorites
            </Typography>
            <Grid container spacing={2}>
                {Array.isArray(favorites) &&
                    favorites.map((favorite) => (
                        <Grid item xs={12} sm={6} md={4} key={favorite.favoriteId}>
                            <GameCard
                                game={{
                                    id: favorite.gameId,
                                    name: favorite.gameName,
                                    description: favorite.description,
                                    genre: favorite.genre,
                                    image: favorite.imageUrl,
                                    price: favorite.price,
                                    difficulty: favorite.difficultyLevel, // Match the 'Game' interface
                                }}
                                isFavorite={true}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};
export default FavoritesPage;
