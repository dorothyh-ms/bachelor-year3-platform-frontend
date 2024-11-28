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
    Autocomplete,
} from '@mui/material';
import { useFetchLobbies } from '../hooks/useFetchLobbies';
import { useFetchGames } from '../hooks/useFetchGames';
import { useCreateLobby } from '../hooks/useCreateLobby';

const Lobby: React.FC = () => {
    const { data: lobbies, isLoading: isLoadingLobbies, isError: isErrorLobbies } = useFetchLobbies();
    const { data: games, isLoading: isLoadingGames, isError: isErrorGames } = useFetchGames();
    const createLobby = useCreateLobby();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGame, setSelectedGame] = useState<{ id: string; name: string } | null>(null);

    const handleCreateLobby = () => {
        if (!selectedGame) {
            alert('Please select a valid game.');
            return;
        }

        createLobby.mutate(selectedGame.id, {
            onSuccess: () => {
                alert('Lobby created successfully!');
                setSelectedGame(null);
                setOpenDialog(false);
            },
            onError: (error) => {
                console.error('Error creating lobby:', error);
                alert('Failed to create lobby.');
            },
        });
    };


    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Game Lobbies
            </Typography>

            {/* Create Lobby Button */}
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginBottom: 2 }}>
                Create Lobby
            </Button>

            {/* Create Lobby Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Create New Lobby</DialogTitle>
                <DialogContent>
                    {isLoadingGames ? (
                        <CircularProgress />
                    ) : isErrorGames ? (
                        <Typography color="error">Failed to load games.</Typography>
                    ) : (
                        <Autocomplete
                            options={games || []}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => setSelectedGame(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Game"
                                    fullWidth
                                    margin="dense"
                                    placeholder="Type to search for a game"
                                />
                            )}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateLobby} color="primary" disabled={!selectedGame}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Display Lobbies */}
            {isLoadingLobbies ? (
                <CircularProgress />
            ) : isErrorLobbies ? (
                <Typography color="error">Failed to load lobbies.</Typography>
            ) : (
                <Box>
                    {lobbies?.length ? (
                        lobbies.map((lobby: any) => (
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
