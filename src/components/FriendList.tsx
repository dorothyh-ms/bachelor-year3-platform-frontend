import React from 'react';
import FriendCard from './FriendCard';
import { Grid } from '@mui/material';
import { mockFriends } from '../utils/mockData';

type FriendListProps = {
    query: string;
};

const FriendList: React.FC<FriendListProps> = ({ query }) => {
    const filteredFriends = mockFriends.filter(friend =>
        friend.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Grid container spacing={2}>
            {filteredFriends.map(friend => (
                <Grid item xs={12} sm={6} md={4} key={friend.id}>
                    <FriendCard friend={friend} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FriendList;
