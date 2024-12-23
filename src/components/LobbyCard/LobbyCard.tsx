import { Card, CardContent, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, IconButton, SnackbarCloseReason, Snackbar } from "@mui/material";
import { Lobby } from "../../types/Lobby"
import SecurityContext from "../../context/SecurityContext";
import { useContext, useState } from "react";
import dayjs from 'dayjs';
import formatDate from "../../utils/formatDate";
import { useJoinLobby } from "../../hooks/useLobbies";
import { useFetchFriends } from "../../hooks/useFriends";
import { useSendInvite } from "../../hooks/useInvites";
import CloseIcon from '@mui/icons-material/Close';

interface LobbyCardProps {
    lobby: Lobby
}
const LobbyCard = (props: LobbyCardProps) => {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };
    const action = (
        <>

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );


    const [ snackbarOpen, setSnackBarOpen ] = useState<boolean>(false);
    const [snackbarMessage, setSnackBarMessage] = useState<string>();
   
    const [open, setOpen] = useState<boolean>(false);
    const [invitedPlayerId, setInvitedPlayerId] = useState<string>('');
    const { friends, isError: friendsError, isLoading: friendsLoading } = useFetchFriends();
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleInviteSuccess = () => {
        setInvitedPlayerId("");
        setOpen(false);
        setSnackBarOpen(true);
        setSnackBarMessage("Invitation sent");

    }

    const {sendGameInvite} = useSendInvite(handleInviteSuccess);

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setInvitedPlayerId(event.target.value as string);
    }

    const handleDialogClose = () => {
        setOpen(false);
    };

    const { lobby } = props;
    const { loggedInUser } = useContext(SecurityContext);

    const { joinLobby } = useJoinLobby();
    const currentUserCreatedLobby = loggedInUser?.username == lobby.createdBy.username;
    let description;

    if (currentUserCreatedLobby) {
        description = "You created this lobby ";
    } else {
        description = `Created by ${lobby.createdBy.username} `;
    }
    description += formatDate(dayjs(lobby.createdDate));

    return (<>
        <Card key={lobby.id} sx={{ marginBottom: 2, width: { xs: "32rem", xl: "48rem" } }}>
            <CardContent sx={{ paddingBottom: 2, gap: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Typography variant='subtitle1'>{lobby.game.name}</Typography>
                    <Typography variant="caption">
                        {description}
                    </Typography>
                </Box>
                {!currentUserCreatedLobby && (!lobby.matchURL) && <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                        joinLobby(lobby.id)
                    }
                >
                    Join game
                </Button>}
                {
                    currentUserCreatedLobby && <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                    >Invite friend</Button>
                }
            </CardContent>
        </Card>
        <Dialog
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    console.log(email);
                    handleDialogClose();
                },
            }}
        >
            <DialogTitle>Invite friend</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose a friend below to invite them to play {lobby.game.name}.
                </DialogContentText>
                <FormControl sx={{ width: "100%", mt: 2 }}>
                    <Select
                        onChange={handleChange}
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {friends &&
                            friends.map((friend) => <MenuItem value={friend.friendId} >{friend.friendUsername}</MenuItem>)
                        }

                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={handleDialogClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        if (invitedPlayerId){
                            sendGameInvite({
                                lobbyId: lobby.id,
                                userId: invitedPlayerId
                            })

                        }
                    }}
                    variant="contained"
                    color="secondary"
                    >Invite</Button>
            </DialogActions>
        </Dialog>
        <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbarMessage}
                action={action}
            />

    </>
    )
}

export default LobbyCard;