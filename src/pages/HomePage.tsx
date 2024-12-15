import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const mockGames = [
    { id: 1, name: 'Game 1', img: '' },
    { id: 2, name: 'Game 2', img: '' },
    { id: 3, name: 'Game 3', img: '' },
    { id: 4, name: 'Game 4', img: '' },
];

const Home = () => {
    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f0f4f8' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#4CAF50' }}>
                Welcome
            </Typography>
            <Typography align="center" sx={{ marginBottom: '2rem', color: '#555' }}>
                Play your games freely and openly
            </Typography>
            <Typography variant="h6" gutterBottom>
                New Games
            </Typography>
            <Grid container spacing={3}>
                {mockGames.map((game) => (
                    <Grid item xs={12} sm={6} md={3} key={game.id}>
                        <Card
                            sx={{
                                padding: '1rem',
                                backgroundColor: '#ffffff',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {game.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
