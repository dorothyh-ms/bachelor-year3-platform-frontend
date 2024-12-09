import React, { useState } from 'react';
import FriendSearch from '../components/FriendSearch';
import FriendList from '../components/FriendList';
import { useFetchFriends } from '../hooks/useFetchFriends';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

const Friends: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data: friends, isLoading, isError } = useFetchFriends();

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery || ''); // Ensure query is always a string
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Friends
            </Typography>
            <FriendSearch onSearch={handleSearch} />

            {/* Loading State */}
            {isLoading && (
                <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
            )}

            {/* Error State */}
            {isError && (
                <Alert severity="error">Failed to load friends. Please try again later.</Alert>
            )}

            {/* Friends List */}
            {friends && <FriendList query={query} friends={friends} />}
        </Container>
    );
};

export default Friends;
