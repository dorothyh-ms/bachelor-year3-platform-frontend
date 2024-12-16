import React from "react";
import { Grid, Typography, CircularProgress, Alert } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import GameCard from "../components/GameCard/GameCard";
import useFavorites from "../hooks/useFavorites";

const FavoritesPage: React.FC = () => {
    const { favorites = [], isLoading, isError, removeFavorite } = useFavorites();

    return (
        <PageLayout title="Favorites">
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Alert severity="error">Failed to load favorites.</Alert>
            ) : favorites.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
                    You have no favorite games yet.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {favorites.map((game) => (
                        <Grid item xs={12} sm={6} md={4} key={game.id}>
                            <GameCard
                                game={game}
                                isFavorite={true}
                                onAddFavorite={() => {}}
                                onRemoveFavorite={() => removeFavorite(game.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </PageLayout>
    );
};

export default FavoritesPage;
