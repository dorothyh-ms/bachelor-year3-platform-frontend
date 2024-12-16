import React, { useState } from 'react';
import FriendList from '../components/FriendList.tsx';
import FriendSearch from '../components/FriendSearch.tsx';
import { useFetchFriends } from '../hooks/useFetchFriends.ts';
import { Container, Box, CircularProgress, Typography } from '@mui/material';

const FriendsPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const { friends, isLoading, isError } = useFetchFriends();

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Friends
                </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
                <FriendSearch onSearch={handleSearch} />
            </Box>
            <Box>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
                {isError && (
                    <Typography color="error" align="center">
                        There was an error loading friends. Please try again later.
                    </Typography>
                )}
                {!isLoading && !isError && <FriendList query={query} friends={friends || []} />}
            </Box>
        </Container>
    );
};

export default FriendsPage;
