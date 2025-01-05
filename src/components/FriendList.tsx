import { CircularProgress, Stack, Typography } from "@mui/material";
import FriendCard from "./FriendCard/FriendCard";
import { Friend } from "../types/Friend";

interface FriendsListProps {
    friends: Friend[] | undefined,
    isLoading: boolean,
    isError: boolean
}

const FriendsList = (props: FriendsListProps) => {
    const { friends, isLoading, isError } = props;


    if (isLoading) {
        return <CircularProgress color="secondary" />
    }
    if (isError) {
        return <Typography>Your friends could not be loaded.</Typography>
    }

    if (friends) {
        if (friends.length) {
           return  <Stack gap={1}>
                {friends.map(friend => <FriendCard friend={friend} />)}
            </Stack>

        }
    }
    return <Typography>You have not added any friends yet.</Typography>
}

export default FriendsList;
