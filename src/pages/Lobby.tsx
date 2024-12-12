import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from '@mui/material';
import { useFetchLobbies } from '../hooks/useFetchLobbies';
import { useCreateLobby } from '../hooks/useCreateLobby';
import { Lobby as LobbyType } from '../types/Lobby'; // Import the Lobby definition from types

const Lobby: React.FC = () => {
    const { data: lobbies, isLoading, isError } = useFetchLobbies();
    const createLobby = useCreateLobby();

    const [openDialog, setOpenDialog] = useState(false);
    const [gameId, setGameId] = useState('');

    const handleCreateLobby = () => {
        if (!gameId.trim()) {
            alert('Please provide a valid Game ID');
            return;
        }

        createLobby.mutate(gameId, {
            onSuccess: () => {
                alert('Lobby created successfully!');
                setGameId('');
                setOpenDialog(false);
            },
            onError: (error) => {
                console.error('Error creating lobby:', error);
                alert('Failed to create lobby. Please try again.');
            },
        });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Game Lobbies
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
                sx={{ marginBottom: 2 }}
            >
                Create Lobby
            </Button>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="create-lobby-title"
                aria-describedby="create-lobby-description"
            >
                <DialogTitle id="create-lobby-title">Create New Lobby</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Game ID"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateLobby} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {isLoading && (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                    <Typography sx={{ marginLeft: 2 }}>Loading lobbies...</Typography>
                </Box>
            )}
            {isError && <Typography color="error">Failed to load lobbies.</Typography>}
            {!isLoading && !isError && (
                <Box>
                    {lobbies?.length ? (
                        lobbies.map((lobby: LobbyType) => ( // Use the LobbyType here
                            <Card key={lobby.id} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">Lobby ID: {lobby.id}</Typography>
                                    <Typography>Game: {lobby.gameDto.name}</Typography>
                                    <Typography>Status: {lobby.lobbyStatus}</Typography>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No active lobbies available.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Lobby;
