import React from 'react';
import { TextField } from '@mui/material';

type SearchProps = {
    onSearch: (query: string) => void;
};

const FriendSearch: React.FC<SearchProps> = ({ onSearch }) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <TextField
            label="Search friends"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
        />
    );
};

export default FriendSearch;
