import React, { useState } from 'react';
import FriendSearch from '../components/FriendSearch';
import FriendList from '../components/FriendList';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import PageLayout from '../layouts/PageLayout';

const Friends =() => {
    const [query, setQuery] = useState('');
    const [friendUserId, setFriendUserId] = useState('');

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    const handleAddFriend = () => {
        if (friendUserId.trim() !== '') {
            console.log(`Adding friend with user ID: ${friendUserId}`);
            setFriendUserId(''); // Clear the input after adding
        }
    };

    return (
        <PageLayout title="Friends">
            {/* Add Friend Section */}
            <Box
                display="flex"
                alignItems="center"
                my={3}
                gap={2}
            >
                <TextField
                    label="Friend User ID"
                    variant="outlined"
                    value={friendUserId}
                    onChange={(e) => setFriendUserId(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddFriend}>
                    Add Friend
                </Button>
            </Box>

            {/* Existing Friend Search Component */}
            <FriendSearch onSearch={handleSearch} />

            {/* Existing Friend List Component */}
            <FriendList query={query} />
        </PageLayout>
    );
};

export default Friends;
