import React, { useState } from 'react';
import { useFetchLobbies } from '../hooks/useFetchLobbies';
import { useFetchPlayers } from '../hooks/useFetchPlayers';
import { useInvitePlayer } from '../hooks/useInvitePlayer';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Autocomplete,
} from '@mui/material';

const InvitePlayer: React.FC = () => {
    const { data: lobbies, isLoading: loadingLobbies, isError: errorLobbies } = useFetchLobbies();
    const { data: players, isLoading: loadingPlayers, isError: errorPlayers } = useFetchPlayers('');
    const invitePlayer = useInvitePlayer();

    const [selectedLobby, setSelectedLobby] = useState<{ id: string; gameDto: { name: string } } | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<{ id: string; username: string } | null>(null);

    const handleInvite = () => {
        if (!selectedLobby || !selectedPlayer) {
            alert('Please select a lobby and a player.');
            return;
        }

        invitePlayer.mutate(
            { lobbyId: selectedLobby.id, userId: selectedPlayer.id },
            {
                onSuccess: () => alert('Player invited successfully!'),
                onError: (error) => alert(`Error inviting player: ${error}`),
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
                <CircularProgress />
            ) : errorLobbies ? (
                <Typography color="error">Failed to load lobbies.</Typography>
            ) : (
                <Autocomplete
                    options={lobbies || []}
                    getOptionLabel={(option) => option.gameDto.name}
                    onChange={(event, value) => setSelectedLobby(value)}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Lobby" placeholder="Search Lobbies" fullWidth />
                    )}
                    sx={{ marginBottom: 2 }}
                />
            )}

            {/* Player Dropdown */}
            {loadingPlayers ? (
                <CircularProgress />
            ) : errorPlayers ? (
                <Typography color="error">Failed to load players.</Typography>
            ) : (
                <Autocomplete
                    options={players || []}
                    getOptionLabel={(option) => option.username}
                    onChange={(event, value) => setSelectedPlayer(value)}
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
