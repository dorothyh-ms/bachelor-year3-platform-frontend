import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Friend } from '../../types/Friend';

interface FriendProps {
    friend: Friend
};

const FriendCard = ( props: FriendProps) => {
    const {friend} = props;
    return (
        <Card sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "75%", md: "50%", lg: "25%" }
        }}>
            <CardContent>
                {friend.friendUsername}
            </CardContent>
            
        </Card>
    );
};

export default FriendCard;
