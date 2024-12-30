import React from "react";
import {Alert, Box, CircularProgress, Grid} from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import {GameCard} from "../components/GameCard/GameCard";
import {useFetchGames} from "../hooks/useGames";
import {useAddToFavorites} from "../hooks/useFavorites";

const Games = () => {
    const {data: games, isLoading, isError} = useFetchGames();
    const {mutate: addFavorite} = useAddToFavorites();

    return (
        <PageLayout title="Library">
            {isLoading && (
                <Box sx={{display: "flex", justifyContent: "center", padding: 4}}>
                    <CircularProgress color="secondary"/>
                </Box>
            )}
            {isError && (
                <Alert severity="error">Failed to load games. Please try again later.</Alert>
            )}
            {games && (
                <Grid container spacing={2}>
                    {games.map((game) => (
                        <Grid item xs={12} sm={6} md={4} key={game.id}>
                            <GameCard
                                game={game}
                                isFavorite={false}
                                onToggleFavorite={() => addFavorite(game.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </PageLayout>
    );
};

export default Games;
