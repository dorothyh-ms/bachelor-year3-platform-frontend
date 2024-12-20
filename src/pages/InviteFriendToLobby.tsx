import React, { useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    TextField,
    Button,
    Container,
    Autocomplete,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { useFetchFriends } from '../hooks/useFetchFriends';
import { useFetchLobbies } from '../hooks/useFetchLobbies';
import { useSendLobbyInvite } from '../hooks/useSendLobbyInvite';

const InviteFriendToLobby: React.FC = () => {
    const [selectedFriend, setSelectedFriend] = useState<{ id: string; username: string } | null>(null);
    const [selectedLobby, setSelectedLobby] = useState<{ id: string; gameName: string } | null>(null);

    const { friends, isLoading: loadingFriends } = useFetchFriends();
    const { lobbies, isLoading: loadingLobbies } = useFetchLobbies();
    const sendInvite = useSendLobbyInvite();

    const handleSendInvite = () => {
        if (selectedFriend && selectedLobby) {
            sendInvite.mutate(
                { friendId: selectedFriend.id, lobbyId: selectedLobby.id },
                {
                    onSuccess: () => alert(`Invite sent to ${selectedFriend.username} for lobby ${selectedLobby.gameName}!`),
                    onError: (error) => alert(`Failed to send invite: ${error}`),
                }
            );
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Invite a Friend to a Lobby
            </Typography>

            {/* Select Friend */}
            {loadingFriends ? (
                <CircularProgress />
            ) : (
                <Autocomplete
                    options={friends || []}
                    getOptionLabel={(friend) => friend.username}
                    onChange={(e, value) => setSelectedFriend(value)}
                    renderInput={(params) => <TextField {...params} label="Select Friend" placeholder="Search Friends" />}
                    sx={{ mb: 3 }}
                />
            )}

            {/* Select Lobby */}
            {loadingLobbies ? (
                <CircularProgress />
            ) : (
                <Autocomplete
                    options={lobbies || []}
                    getOptionLabel={(lobby) => lobby.gameDto.name}
                    onChange={(e, value) => setSelectedLobby(value)}
                    renderInput={(params) => <TextField {...params} label="Select Lobby" placeholder="Search Lobbies" />}
                    sx={{ mb: 3 }}
                />
            )}

            {/* Send Invite Button */}
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendInvite}
                    disabled={!selectedFriend || !selectedLobby}
                >
                    Send Invite
                </Button>
            </Box>
        </Container>
    );
};

export default InviteFriendToLobby;
