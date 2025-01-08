import React from "react";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {useFavorites, useRemoveFromFavorites} from "../hooks/useFavorites";
import GameCard from "../components/GameCard/GameCard";

const FavoritesPage = () => {
    const {data: favorites, isLoading, isError} = useFavorites();
    const {mutate: removeFavorite} = useRemoveFromFavorites();

    if (isLoading) return <CircularProgress/>;
    if (isError)
        return <Typography color="error">Error loading favorites</Typography>;

    return (
        <Box>
            <Typography variant="h4">My Favorites</Typography>
            <Grid container spacing={2}>
                {favorites?.map((favorite) => (
                    <Grid item key={favorite.favoriteId}>
                        {favorite.game ? (
                            <GameCard
                                game={favorite.game}
                                isFavorite={true}
                                onToggleFavorite={() => removeFavorite(favorite.favoriteId)}
                            />
                        ) : (
                            <Typography color="error">Invalid favorite data</Typography>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FavoritesPage;
