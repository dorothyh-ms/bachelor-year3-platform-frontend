
import React, { useState } from 'react';
import { useGetLobbies } from '../hooks/useLobbies';
import { useFetchPlayers } from '../hooks/usePlayers';
import { useInvitePlayer } from '../hooks/useInvitePlayer';
import { Box, Typography, TextField, Button, CircularProgress, Autocomplete } from '@mui/material';

const InvitePlayer = () => {
    const { data: lobbies, isLoading: loadingLobbies, isError: errorLobbies } = useGetLobbies();
    const { data: players, isLoading: loadingPlayers, isError: errorPlayers } = useFetchPlayers('');
    const invitePlayer = useInvitePlayer();

    const [selectedLobby, setSelectedLobby] = useState<{ id: string; gameDto: { name: string } } | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<{ playerId: string; username: string } | null>(null);

    // Fetch the logged-in user's ID from Keycloak or your authentication system
    const loggedInUserId = localStorage.getItem('logged_in_user_id'); // Ensure this is set on login

    const handleInvite = () => {
        if (!selectedLobby || !selectedLobby.id) {
            alert('Please select a valid lobby.');
            return;
        }
        if (!selectedPlayer || !selectedPlayer.playerId) {
            alert('Please select a valid player.');
            return;
        }

        console.log('Inviting player with payload:', {
            lobbyId: selectedLobby.id,
            userId: selectedPlayer.playerId,
        });

        invitePlayer.mutate(
            { lobbyId: selectedLobby.id, userId: selectedPlayer.playerId },
            {
                onSuccess: () => alert('Player invited successfully!'),
                onError: (error) => {
                    console.error('Error inviting player:', error);
                    alert(`Error inviting player: ${error}`);
                },
            }
        );
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Invite Player to Lobby
            </Typography>

            {/* Lobby Dropdown */}
            {loadingLobbies ? (
                <CircularProgress color='secondary' />
            ) : errorLobbies ? (
                <Typography color="error">Failed to load lobbies.</Typography>
            ) : (
                <Autocomplete
                    options={lobbies || []}
                    getOptionLabel={(option) => option.gameDto.name || 'Unknown Lobby'}
                    onChange={(event, value) => {
                        console.log('Selected Lobby:', JSON.stringify(value, null, 2));
                        setSelectedLobby(value);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Lobby" placeholder="Search Lobbies" fullWidth />
                    )}
                    sx={{ marginBottom: 2 }}
                />
            )}

            {/* Player Dropdown */}
            {loadingPlayers ? (
                <CircularProgress color='secondary' />
            ) : errorPlayers ? (
                <Typography color="error">Failed to load players.</Typography>
            ) : (
                <Autocomplete
                    options={players?.filter((player) => player.playerId !== loggedInUserId) || []} // Filter out logged-in user
                    getOptionLabel={(option) => option.username || 'Unknown Player'}
                    onChange={(event, value) => {
                        console.log('Selected Player:', JSON.stringify(value, null, 2));
                        setSelectedPlayer(value);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Player" placeholder="Search Players" fullWidth />
                    )}
                    sx={{ marginBottom: 2 }}
                />
            )}

            {/* Invite Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleInvite}
                disabled={!selectedLobby || !selectedPlayer}
                sx={{ marginTop: 2 }}
            >
                Invite Player
            </Button>
        </Box>
    );
};

export default InvitePlayer;

