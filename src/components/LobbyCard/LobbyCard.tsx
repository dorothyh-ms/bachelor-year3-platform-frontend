// src/components/LobbyCard/LobbyCard.tsx
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    IconButton,
    SnackbarCloseReason,
    Snackbar,
} from "@mui/material";
import { Lobby } from "../../types/Lobby";
import SecurityContext from "../../context/SecurityContext";
import { useContext, useState, useMemo } from "react";
import dayjs from "dayjs";
import formatDate from "../../utils/formatDate";
import { useJoinLobby, useDeleteLobby, useRejoinLobby } from "../../hooks/useLobbies";
import { useFetchFriends } from "../../hooks/useFriends";
import { useSendInvite } from "../../hooks/useInvites";
import CloseIcon from "@mui/icons-material/Close";

interface LobbyCardProps {
    lobby: Lobby;
}

const LobbyCard = ({ lobby }: LobbyCardProps) => {
    const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackBarMessage] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [invitedPlayerId, setInvitedPlayerId] = useState<string>("");

    const { friends } = useFetchFriends();
    const { loggedInUser } = useContext(SecurityContext);
    const { joinLobby } = useJoinLobby();
    const { rejoinLobby } = useRejoinLobby();
    const { deleteLobby, isLoading: isDeleting } = useDeleteLobby();

    const handleClose = (_: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setSnackBarOpen(false);
    };

    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    const handleClickOpen = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleChange = (event: SelectChangeEvent) => {
        setInvitedPlayerId(event.target.value as string);
    };

    const handleInviteSuccess = () => {
        setInvitedPlayerId("");
        setOpen(false);
        setSnackBarOpen(true);
        setSnackBarMessage("Invitation sent");
    };

    const handleDeleteSuccess = () => {
        setSnackBarOpen(true);
        setSnackBarMessage("Lobby deleted");
    };

    const { sendGameInvite } = useSendInvite(handleInviteSuccess);

    const creator = lobby.createdBy ?? lobby.initiatingPlayer;
    const createdAt = lobby.createdDate ?? lobby.dateCreated;
    const currentUserCreatedLobby =
        !!loggedInUser?.username && !!creator?.username && loggedInUser.username === creator.username;

    const description = useMemo(() => {
        const prefix = creator ? (currentUserCreatedLobby ? "You created this lobby " : `Created by ${creator.username} `) : "Created ";
        return prefix + (createdAt ? formatDate(dayjs(createdAt)) : "");
    }, [creator, currentUserCreatedLobby, createdAt]);

    const statusStr = (lobby.lobbyStatus ?? lobby.status) || "OPEN";
    const isClosed = statusStr === "CLOSED";
    const canJoin = !lobby.matchURL && !isClosed;

    const onJoinError = (err: unknown) => {
        // Backend returns 409 with { error: "..."} after our handler below
        const msg =
            (err as any)?.response?.data?.error ||
            (err as any)?.message ||
            "Could not join the lobby.";
        setSnackBarMessage(msg);
        setSnackBarOpen(true);
    };

    return (
        <>
            <Card sx={{ marginBottom: 2, width: { xs: "32rem", xl: "48rem" } }}>
                <CardContent
                    sx={{
                        paddingBottom: 2,
                        gap: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                        <Typography variant="subtitle1">{lobby.game.name}</Typography>
                        <Typography variant="caption">{description}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        {/* Non-creator joins via PATCH /lobbies/{id} */}
                        {!currentUserCreatedLobby && canJoin && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => joinLobby(lobby.id, { onError: onJoinError })}
                            >
                                Join game
                            </Button>
                        )}

                        {/* Creator re-joins via POST /lobbies/{id}/rejoin */}
                        {currentUserCreatedLobby && canJoin && (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => rejoinLobby(lobby.id, { onError: onJoinError })}
                            >
                                Join game
                            </Button>
                        )}

                        {/* Invite friend button for creator */}
                        {currentUserCreatedLobby && (friends?.length ?? 0) > 0 && (
                            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                Invite friend
                            </Button>
                        )}

                        {/* Delete lobby button for creator */}
                        {currentUserCreatedLobby && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    deleteLobby(lobby.id, { onSuccess: handleDeleteSuccess });
                                }}
                                sx={{ ml: 2 }}
                                disabled={isDeleting}
                            >
                                Delete Lobby
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
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
                        <Select onChange={handleChange} fullWidth inputProps={{ "aria-label": "Without label" }}>
                            {(friends ?? []).map((friend) => (
                                <MenuItem key={friend.friendId} value={friend.friendId}>
                                    {friend.friendUsername}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button color="error" variant="outlined" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (invitedPlayerId) {
                                sendGameInvite({
                                    lobbyId: lobby.id,
                                    userId: invitedPlayerId,
                                });
                            }
                        }}
                        variant="contained"
                        color="secondary"
                    >
                        Invite
                    </Button>
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
    );
};

export default LobbyCard;
