import { Card, CardContent, Typography, Button } from "@mui/material";
import { Lobby } from "../../types/Lobby"
import SecurityContext from "../../context/SecurityContext";
import { useContext } from "react";
import dayjs from 'dayjs';
import formatDate from "../../utils/formatDate";

interface LobbyCardProps {
    lobby: Lobby
}
const LobbyCard = (props: LobbyCardProps) => {
    const { lobby } = props;
    const { loggedInUser } = useContext(SecurityContext);
    const currentUserCreatedLobby = loggedInUser == lobby.createdBy.username;
    let description;

    if (currentUserCreatedLobby) {
        description = "You created this lobby ";
    } else {
        description = `Created by ${lobby.createdBy.username} `;
    }
    description += formatDate(dayjs(lobby.createdDate));

    return (
        <Card key={lobby.id} sx={{ marginBottom: 2 , width: {xs: "32rem", xl: "48rem"}}}>
            <CardContent sx={{ paddingBottom: 2,  gap: 1, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Typography variant='subtitle1'>{lobby.game.name}</Typography>
                <Typography variant="caption">
                    {description}
                </Typography>
                {!currentUserCreatedLobby && <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => handleJoinLobby(lobby.id)}
                >
                    Join game
                </Button>}
            </CardContent>
        </Card>)
}

export default LobbyCard;