import React from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { useFetchGames } from '../hooks/useFetchGames.ts'; // Hook for fetching games
import { Game } from '../types/Game'; // Game type definition

const Games: React.FC = () => {
    const { data: games, isLoading, isError } = useFetchGames();

    return (
        <Box sx={{ padding: 3, backgroundColor: 'background.default' }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Games
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Pick a game to play
            </Typography>

            {/* Loading State */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <CircularProgress />
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{
                                    backgroundColor: '#2196F3',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#1976D2',
                                    },
                                }}
                            >
                                {game.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Games;
