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
import { useFetchInvites } from '../hooks/useFetchInvites';
import { useSendLobbyInvite } from '../hooks/useSendLobbyInvite';
import { Friend } from '../types/Friend';
import { Lobby } from '../types/Lobby';
import { Invite } from '../types/Invite';
import { useAcceptInvite } from '../hooks/useAcceptInvite';

const GameInvitations: React.FC = () => {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [selectedLobby, setSelectedLobby] = useState<Lobby | null>(null);

    const { friends, isLoading: loadingFriends } = useFetchFriends();
    const { lobbies, isLoading: loadingLobbies } = useFetchLobbies();
    const { invites, isLoading: loadingInvites } = useFetchInvites();
    const sendInvite = useSendLobbyInvite();
    const acceptInvite = useAcceptInvite();

    const handleSendInvite = () => {
        if (selectedFriend && selectedLobby) {
            sendInvite.mutate(
                { friendId: selectedFriend.friendId, lobbyId: selectedLobby.id },
                {
                    onSuccess: () =>
                        alert(`Invite sent to ${selectedFriend.friendUsername} for lobby ${selectedLobby.game.name}!`),
                    onError: (error) => alert(`Failed to send invite: ${error}`),
                }
            );
        }
    };

    const handleAcceptInvite = (inviteId: string) => {
        const payload = { inviteId, action: "ACCEPT" };
        acceptInvite.mutate(payload, {
            onSuccess: () => {
                alert(`Invite ${inviteId} accepted successfully.`);
            },
            onError: (error) => {
                alert(`Failed to accept invite: ${error}`);
            },
        });
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Game Invitations
            </Typography>

            {/* Pending Invites */}
            <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                    Pending Invitations
                </Typography>
                {loadingInvites ? (
                    <CircularProgress />
                ) : invites && invites.length > 0 ? (
                    <Grid container spacing={2}>
                        {invites.map((invite: Invite) => (
                            <Grid item xs={12} key={invite.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography>
                                            Invite from <strong>{invite.sender.username}</strong> to join <strong>{invite.lobby.game.name}</strong>
                                        </Typography>
                                        <Typography>Status: {invite.inviteStatus}</Typography>
                                        {invite.inviteStatus === 'OPEN' && (
                                            <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => handleAcceptInvite(invite.id)}
                                                >
                                                    Accept
                                                </Button>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No pending invites.</Typography>
                )}
            </Box>

            {/* Send Invite */}
            <Box mt={5}>
                <Typography variant="h5" gutterBottom>
                    Send an Invitation
                </Typography>

                {/* Select Friend */}
                {loadingFriends ? (
                    <CircularProgress />
                ) : (
                    <Autocomplete
                        options={friends || []}
                        getOptionLabel={(friend) => friend.friendUsername}
                        onChange={(e, value) => setSelectedFriend(value)}
                        renderInput={(params) => <TextField {...params} label="Select Friend" />}
                        sx={{ mb: 3 }}
                    />
                )}

                {/* Select Lobby */}
                {loadingLobbies ? (
                    <CircularProgress />
                ) : (
                    <Autocomplete
                        options={lobbies || []}
                        getOptionLabel={(lobby) => lobby.game.name || 'Unknown Lobby'}
                        onChange={(e, value) => setSelectedLobby(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Lobby" placeholder="Search Lobbies" fullWidth />
                        )}
                        sx={{ mb: 3 }}
                    />
                )}

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

export default GameInvitations;