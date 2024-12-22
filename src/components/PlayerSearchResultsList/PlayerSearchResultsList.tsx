import { CircularProgress, Stack, Typography } from "@mui/material";
import { useSearchPlayers } from "../../hooks/usePlayers";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Friend } from "../../types/Friend";
import { useContext } from "react";
import SecurityContext from "../../context/SecurityContext";

interface PlayerSearchResults {
    searchedUsername: string, 
    friends: Friend[]
}

const PlayerSearchResultsList = (props: PlayerSearchResults) => {
    const { searchedUsername, friends } = props;
    const friendIds = friends? friends.map(friend => friend.friendId) : [];
  

    const { players, isError, isPending } = useSearchPlayers(searchedUsername);

    if (isError) {
        <Typography>Something went wrong. Please refresh the page and try again.</Typography>
    }
    if (isPending) {
        <CircularProgress color="secondary" />
    }
    if (players) {
        return <Stack gap={1}>
            {players
            .filter(player => !friendIds.includes(player.playerId) )
            .map(player => <PlayerCard player={player} />)}
        </Stack>
    }
    return null;

}

export default PlayerSearchResultsList;