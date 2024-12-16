import React from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { useFetchGames } from '../hooks/useGames.ts'; // Hook for fetching games
import { Game } from '../types/Game.ts'; // Game type definition
import PageLayout from '../layouts/PageLayout.tsx';
import GameCard from '../components/GameCard/GameCard.tsx';

const Games= () => {
    const { data: games, isLoading, isError } = useFetchGames();

    return (
        <PageLayout title="Library" >

            {/* Loading State */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <CircularProgress color='secondary' />
                </Box>
            )}

            {/* Error State */}
            {isError && (
                <Alert severity="error">
                    Failed to load games. Please try again later.
                </Alert>
            )}

            {/* Games Grid */}
            {games && (
                <Grid container spacing={2}>
                    {games.map((game: Game) => (
                        <Grid item xs={12} sm={6} md={4} key={game.id}>
                            <GameCard game={game}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </PageLayout>
    );
};

export default Games;
