import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

type FriendProps = {
    friend: {
        id: number;
        name: string;
        status: string;
        gamesPlayed: number;
        wins: number;
    };
};

const FriendCard: React.FC<FriendProps> = ({ friend }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 300, margin: 2 }}>
            <CardContent>
                <Typography variant="h6">{friend.name}</Typography>
                <Typography color="text.secondary">Status: {friend.status}</Typography>
                <Typography color="text.secondary">Games Played: {friend.gamesPlayed}</Typography>
                <Typography color="text.secondary">Wins: {friend.wins}</Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" color="primary">Invite to Game</Button>
                    <Button variant="outlined" color="secondary">View Stats</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FriendCard;
