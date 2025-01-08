import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Snackbar,
    SnackbarCloseReason,
    Stack,
    Typography,
} from "@mui/material";

import {Game} from "../../types/Game";
import defaultGameImage from "../../assets/images/banditgames-mascot.png";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {useCreateLobby} from "../../hooks/useLobbies";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom";
import {LOBBIES} from "../../constants/routes";

interface GameCardProps {
    game: Game;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const GameCard = (props: GameCardProps) => {
    const navigate = useNavigate();
    const {game, isFavorite, onToggleFavorite} = props;

    const handleSuccess = () => {
        setSnackBarMessage("Successfully created lobby");
        setSnackBarOpen(true);
    };
    const {createLobby} = useCreateLobby(handleSuccess);
    const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackBarMessage] = useState<string>();
    const handleClose = (
        _: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackBarOpen(false);
    };

    const action = (
        <>
            <Button
                color="secondary"
                size="small"
                onClick={() => {
                    navigate(LOBBIES);
                }}
            >
                Go
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </>
    );

    return (
        <Card
            sx={{
                maxWidth: 345,
                minHeight: {xs: "30em", lg: "28em"},
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Stack>
                <CardMedia
                    component="img"
                    height="194"
                    image={game.image ? game.image : defaultGameImage}
                    alt={game.name}
                />
                <CardContent sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography variant="subtitle1" sx={{color: "text.secondary"}}>
                        {game.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: "text.secondary"}}>
                        {game.description}
                    </Typography>
                    <Chip
                        label={(game.genre || "").toLocaleLowerCase()}
                        sx={{width: "fit-content"}}
                    />
                </CardContent>
            </Stack>
            <CardActions disableSpacing>
                {onToggleFavorite && (
                    <Button onClick={onToggleFavorite}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                )}
                <Button
                    onClick={() => {
                        createLobby(game.id);
                    }}
                    color="secondary"
                    variant="contained"
                    endIcon={<MeetingRoomIcon/>}
                    sx={{width: "fit-content", m: 1}}
                >
                    New lobby
                </Button>
            </CardActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            />
        </Card>
    );
};

export default GameCard;
