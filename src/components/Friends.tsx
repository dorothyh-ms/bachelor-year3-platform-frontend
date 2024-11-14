import React, { useState } from 'react';
import FriendSearch from './FriendSearch';
import FriendList from './FriendList';
import { Container, Typography } from '@mui/material';

const Friends: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Friends
            </Typography>
            <FriendSearch onSearch={handleSearch} />
            <FriendList query={query} />
        </Container>
    );
};

export default Friends;
