import React, { useState } from 'react';
import { useInvitePlayer } from '../hooks/useInvitePlayer';
import { Box, Typography, TextField, Button } from '@mui/material';

const InvitePlayer: React.FC = () => {
    const [lobbyId, setLobbyId] = useState('');
    const [userId, setUserId] = useState('');
    const invitePlayer = useInvitePlayer();

    const handleInvite = () => {
        invitePlayer.mutate(
            { lobbyId, userId },
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
            <TextField
                label="Lobby ID"
                value={lobbyId}
                onChange={(e) => setLobbyId(e.target.value)}
                sx={{ marginBottom: 2 }}
                fullWidth
            />
            <TextField
                label="Player ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                sx={{ marginBottom: 2 }}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleInvite}>
                Invite Player
            </Button>
        </Box>
    );
};

export default InvitePlayer;
