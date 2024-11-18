import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const games = Array.from({ length: 12 }, (_, i) => `Game ${i + 1}`);

const Games: React.FC = () => {
    return (
        <Box sx={{ padding: 3, backgroundColor: 'background.default' }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Games
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Pick a game to play
            </Typography>
            <Grid container spacing={2}>
                {games.map((game, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
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
                            {game}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Games;
