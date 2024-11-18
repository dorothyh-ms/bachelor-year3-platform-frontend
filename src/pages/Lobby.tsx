import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const mockLobbies = [
    { id: 1, name: 'Lobby #1', players: 2, status: 'Waiting' },
    { id: 2, name: 'Lobby #2', players: 1, status: 'Waiting' },
];

const Lobby: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Game Lobbies
            </Typography>
            {mockLobbies.map(lobby => (
                <Card
                    key={lobby.id}
                    sx={{
                        margin: '1rem 0',
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{lobby.name}</Typography>
                        <Typography>Players: {lobby.players}</Typography>
                        <Typography>Status: {lobby.status}</Typography>
                        <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
                            Join Lobby
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Lobby;
