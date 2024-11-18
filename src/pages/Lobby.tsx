import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Modal, TextField } from '@mui/material';

const mockLobbies = [
    { id: 1, name: 'Lobby #1', players: 2, status: 'Waiting' },
    { id: 2, name: 'Lobby #2', players: 1, status: 'Waiting' },
    { id: 3, name: 'Lobby #3', players: 3, status: 'In Progress' },
];

const Lobby: React.FC = () => {
    const [lobbies, setLobbies] = useState(mockLobbies);
    const [open, setOpen] = useState(false);
    const [newLobbyName, setNewLobbyName] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateLobby = () => {
        if (newLobbyName.trim()) {
            const newLobby = {
                id: lobbies.length + 1,
                name: newLobbyName,
                players: 0,
                status: 'Waiting',
            };
            setLobbies([...lobbies, newLobby]);
            setNewLobbyName('');
            handleClose();
        }
    };

    return (
        <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ marginBottom: '1.5rem', textAlign: 'center', color: '#4CAF50' }}>
                Game Lobbies
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
                Browse active lobbies or create your own to start playing with friends!
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginBottom: '2rem' }} onClick={handleOpen}>
                Create Lobby
            </Button>
            {lobbies.map((lobby) => (
                <Card
                    key={lobby.id}
                    sx={{
                        margin: '1rem 0',
                        padding: '1rem',
                        boxShadow: 3,
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {lobby.name}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: '0.5rem', color: '#555' }}>
                            Players: {lobby.players} | Status: {lobby.status}
                        </Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                color={lobby.status === 'Waiting' ? 'primary' : 'secondary'}
                                disabled={lobby.status !== 'Waiting'}
                            >
                                {lobby.status === 'Waiting' ? 'Join Lobby' : 'In Progress'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
            {/* Modal for Creating a New Lobby */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Create a New Lobby
                    </Typography>
                    <TextField
                        label="Lobby Name"
                        variant="outlined"
                        fullWidth
                        value={newLobbyName}
                        onChange={(e) => setNewLobbyName(e.target.value)}
                        sx={{ marginBottom: '1rem' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleCreateLobby}>
                        Create Lobby
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Lobby;
