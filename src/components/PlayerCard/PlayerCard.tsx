import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Player } from "../../types/Player";
import { useContext } from "react";
import SecurityContext from "../../context/SecurityContext";
import { useAddFriend, useFetchFriends } from "../../hooks/useFriends";

interface PlayerCardProps {
    player: Player
}


const PlayerCard = (props: PlayerCardProps) => {
    const { loggedInUser } = useContext(SecurityContext);
    const { player } = props;
    const {addFriend} = useAddFriend();

    return <Card sx={{
        display: "flex",
        justifyContent: "space-between",
        width: { xs: "75%", md: "50%", lg: "25%" }
    }}>
        <CardContent>
            {player.username}
        </CardContent>
        <CardActions >
            {player.username === loggedInUser?.username ?
                <Typography sx={{mr: 1}} >You</Typography> :
                <Button variant="outlined" color="secondary"
                onClick={()  => {
                    addFriend(player.playerId);
                }}
                 >Add friend</Button>
            }
        </CardActions>
    </Card>
}

export default PlayerCard;