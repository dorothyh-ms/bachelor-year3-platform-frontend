import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { mockInvitations } from '../utils/mockData'; // Import mock data

const GameInvitations: React.FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Game Invitations
            </Typography>
            <Grid container spacing={2}>
                {mockInvitations.map((invite) => (
                    <Grid item xs={12} sm={6} md={4} key={invite.id}>
                        <Card sx={{ backgroundColor: '#f9f9f9', boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{invite.game}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Invited by: {invite.inviter}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date: {invite.date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: {invite.status}
                                </Typography>
                                {invite.status === 'Pending' && (
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
