
import { useState } from 'react';
import SearchPlayerTextField from '../components/SearchPlayerTextField/SearchPlayerTextField';
import FriendsList from '../components/FriendList';
import PageLayout from '../layouts/PageLayout';
import PlayerSearchResultsList from '../components/PlayerSearchResultsList/PlayerSearchResultsList';
import { useFetchFriends } from '../hooks/useFriends';


const FriendsPage = () => {
    const [searchedUsername, setSearchedUsername] = useState<string | undefined>("");
    const { friends, isLoading, isError } = useFetchFriends();
    return (
        <PageLayout title={"My friends"}>
            <FriendsList
                friends={friends}
                isError={isError}
                isLoading={isLoading}
            />
            <SearchPlayerTextField
                searchedUsername={searchedUsername}
                onChange={(newValue: string) => {
                    setSearchedUsername(newValue);
                }}
            />
            {
                searchedUsername &&
                <PlayerSearchResultsList
                friends={friends}
                    searchedUsername={searchedUsername}
                />
            }
        </PageLayout>
    );
};

export default FriendsPage;
