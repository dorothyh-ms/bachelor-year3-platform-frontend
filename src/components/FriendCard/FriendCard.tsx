import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

type FriendProps = {
    friend: {
        friendId: string;
        friendUsername: string;
    };
};

const FriendCard: React.FC<FriendProps> = ({ friend }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: 300, margin: 2 }}>
            <CardContent>
                <Typography variant="h6">{friend.friendUsername}</Typography>
                <Typography color="text.secondary">Friend ID: {friend.friendId}</Typography>
                <Box mt={2}>
                    <Typography color="text.secondary">
                        Add more features like actions or details here
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default FriendCard;
