import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useFetchInvites } from "../hooks/useFetchInvites.ts";

const GameInvitations: React.FC = () => {
    const { data: invites, isLoading, isError } = useFetchInvites();
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Game Invitations
            </Typography>
            <Grid container spacing={2}>
                {isLoading && (
                    <Typography variant="body1" align="center" gutterBottom>
                        Loading invitations...
                    </Typography>
                )}
                {isError && (
                    <Typography variant="body1" color="error" align="center" gutterBottom>
                        Error fetching invitations.
                    </Typography>
                )}
                {!isLoading && !isError && (!invites || invites.length === 0) && (
                    <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
                        No invitations available.
                    </Typography>
                )}
                {!isLoading &&
                    !isError &&
                    invites &&
                    invites.map((invite) => (
                        <Grid item xs={12} sm={6} md={4} key={invite.id}>
                            <Card sx={{ backgroundColor: '#f9f9f9', boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{invite.lobby.game.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Invited by: {invite.sender.username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date: {new Date(invite.lobby.dateCreated).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: {invite.inviteStatus}
                                    </Typography>
                                    {invite.lobby.status === 'OPEN' && (
                                        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                                            <Button variant="contained" color="primary" size="small">
                                                Accept
                                            </Button>
                                            <Button variant="outlined" color="error" size="small">
                                                Decline
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default GameInvitations;
