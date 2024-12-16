import React from "react";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import { useFetchGames } from "../hooks/useGames";
import PageLayout from "../layouts/PageLayout";
import GameCard from "../components/GameCard/GameCard";
import useFavorites from "../hooks/useFavorites";
import { Game } from "../types/Game";

const GamesPage: React.FC = () => {
    const { data: games, isLoading: gamesLoading, isError: gamesError } = useFetchGames();
    const {
        favorites,
        isLoading: favoritesLoading,
        isError: favoritesError,
        addFavorite,
        removeFavorite,
    } = useFavorites();

    const isFavorite = (game: Game) => favorites.some((fav) => fav.id === game.id);

    if (gamesLoading || favoritesLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (gamesError || favoritesError) {
        return (
            <Alert severity="error">
                Failed to load games or favorites. Please try again later.
            </Alert>
        );
    }

    return (
        <PageLayout title="Library">
            <Grid container spacing={2}>
                {games?.map((game: Game) => (
                    <Grid item xs={12} sm={6} md={4} key={game.id}>
                        <GameCard
                            game={game}
                            isFavorite={isFavorite(game)}
                            onAddFavorite={() => addFavorite(game)}
                            onRemoveFavorite={() => removeFavorite(game.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </PageLayout>
    );
};

export default GamesPage;
