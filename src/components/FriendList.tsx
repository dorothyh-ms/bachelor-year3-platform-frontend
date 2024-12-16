import React from 'react';
import FriendCard from '../components/FriendCard/FriendCard';
import { Grid, Typography } from '@mui/material';

type FriendListProps = {
    query: string;
    friends: Array<{
        friendId: string;
        friendUsername: string;
    }>;
};

const FriendList: React.FC<FriendListProps> = ({ query = '', friends = [] }) => {
    // Safeguard against undefined or null `friends`
    if (!Array.isArray(friends)) {
        return <Typography color="error">Invalid data: Friends list is not an array.</Typography>;
    }

    const filteredFriends = friends.filter(
        friend => friend?.friendUsername?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Grid container spacing={2}>
            {filteredFriends.length > 0 ? (
                filteredFriends.map(friend => (
                    <Grid item xs={12} sm={6} md={4} key={friend.friendId}>
                        <FriendCard friend={friend} />
                    </Grid>
                ))
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No friends match the search query.
                </Typography>
            )}
        </Grid>
    );
};

export default FriendList;
