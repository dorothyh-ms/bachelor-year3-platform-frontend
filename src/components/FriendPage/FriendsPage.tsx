import React, { useState } from 'react';
import FriendList from '../FriendList.tsx';
import FriendSearch from '../FriendSearch.tsx';
import { useFetchFriends } from '../../hooks/useFetchFriends.ts';

const FriendsPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const { friends, isLoading, isError } = useFetchFriends();

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    if (isLoading) return <p>Loading friends...</p>;
    if (isError) return <p>There was an error loading friends.</p>;

    return (
        <>
            <FriendSearch onSearch={handleSearch} />
            <FriendList query={query} friends={friends || []} />
        </>
    );
};

export default FriendsPage;
