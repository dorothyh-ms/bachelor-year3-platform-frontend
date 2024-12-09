// import React from 'react';
// import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
// import { mockInvitations } from '../utils/mockData'; // Import mock data
//
// const GameInvitations: React.FC = () => {
//     return (
//         <Box sx={{ padding: 2 }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Game Invitations
//             </Typography>
//             <Grid container spacing={2}>
//                 {mockInvitations.map((invite) => (
//                     <Grid item xs={12} sm={6} md={4} key={invite.id}>
//                         <Card sx={{ backgroundColor: '#f9f9f9', boxShadow: 2 }}>
//                             <CardContent>
//                                 <Typography variant="h6">{invite.game}</Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Invited by: {invite.inviter}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Date: {invite.date}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Status: {invite.status}
//                                 </Typography>
//                                 {invite.status === 'Pending' && (
//                                     <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
//                                         <Button variant="contained" color="primary" size="small">
//                                             Accept
//                                         </Button>
//                                         <Button variant="outlined" color="error" size="small">
//                                             Decline
//                                         </Button>
//                                     </Box>
//                                 )}
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };
//
// export default GameInvitations;
//
import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useFetchInvites } from '../hooks/useFetchInvites';
import axios from 'axios';

const GameInvitations: React.FC = () => {
    const { data: invites, isLoading, isError, refetch } = useFetchInvites();

    const handleAcceptInvite = async (inviteId: string) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.patch(
                `http://localhost:8091/api/invites/${inviteId}`,
                { action: 'ACCEPT' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Invitation accepted!');
            refetch(); // Refresh invitations
        } catch (err) {
            alert('Failed to accept the invitation.');
        }
    };

    const handleDeclineInvite = async (inviteId: string) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.patch(
                `http://localhost:8091/api/invites/${inviteId}`,
                { action: 'DECLINE' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Invitation declined!');
            refetch(); // Refresh invitations
        } catch (err) {
            alert('Failed to decline the invitation.');
        }
    };

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Failed to load game invitations.</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Game Invitations
            </Typography>
            <Grid container spacing={2}>
                {invites?.length ? (
                    invites.map((invite: any) => (
                        <Grid item xs={12} sm={6} md={4} key={invite.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{invite.lobby.gameDto.name}</Typography>
                                    <Typography variant="body2">
                                        Invited by: {invite.sender.username}
                                    </Typography>
                                    <Typography variant="body2">
                                        Date: {new Date(invite.createdAt).toLocaleString()}
                                    </Typography>
                                    {invite.status === 'PENDING' && (
                                        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleAcceptInvite(invite.id)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeclineInvite(invite.id)}
                                            >
                                                Decline
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No invitations found.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default GameInvitations;

