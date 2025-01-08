import {useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import {useCreateLobby, useGetLobbies, useJoinLobby} from '../hooks/useLobbies';
import {useFetchGames} from '../hooks/useGames';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import PageLayout from '../layouts/PageLayout';

const Lobby = () => {
    const {lobbies, isError: lobbiesLoadError, isLoading: lobbiesLoading} = useGetLobbies();
    const {data: games, isLoading: isLoadingGames, isError: isErrorGames} = useFetchGames();
    const {createLobby} = useCreateLobby();
    const {} = useJoinLobby();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGame, setSelectedGame] = useState<{ id: string; name: string } | null>(null);


    const renderLobbies = () => {
        if (lobbiesLoading) return <CircularProgress color='secondary'/>
        if (lobbiesLoadError) return <Typography color="error">Failed to load lobbies.</Typography>
        return <Box sx={{width: "100%"}}>
            {lobbies?.length ? (
                lobbies.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).map((lobby: any) => (
                    <LobbyCard lobby={lobby}/>
                ))
            ) : (
                <Typography>No active lobbies available.</Typography>
            )}
        </Box>
    }

    return (
        <PageLayout title="Lobbies">

            {/* Create Lobby Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
            >
                <DialogTitle>Create lobby</DialogTitle>
                <DialogContent>
                    {isLoadingGames ? (
                        <CircularProgress/>
                    ) : isErrorGames ? (
                        <Typography color="error">Failed to load games.</Typography>
                    ) : (
                        <Autocomplete
                            options={games || []}
                            getOptionLabel={(option: { id: string; name: string }) => option.name}
                            onChange={(_, value: { id: string; name: string } | null) => setSelectedGame(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Game"
                                    fullWidth
                                    margin="dense"
                                    placeholder="Type to search for a game"
                                />
                            )}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        selectedGame && createLobby(selectedGame.id);
                    }} color="primary" disabled={!selectedGame}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            {renderLobbies()}
            <Button
                variant="contained"
                color="secondary"
                sx={{width: "fit-content"}}
                onClick={() => setOpenDialog(true)}>
                Create Lobby
            </Button>
        </PageLayout>
    );
};

export default Lobby;
