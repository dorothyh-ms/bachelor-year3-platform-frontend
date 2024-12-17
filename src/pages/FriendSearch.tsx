import React from 'react';
import { TextField, Box } from '@mui/material';

type SearchProps = {
    onSearch: (query: string) => void;
    placeholder?: string;
};

const FriendSearch: React.FC<SearchProps> = ({ onSearch, placeholder = 'Search...' }) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <Box>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                onChange={handleSearch}
                placeholder={placeholder}
            />
        </Box>
    );
};

export default FriendSearch;
