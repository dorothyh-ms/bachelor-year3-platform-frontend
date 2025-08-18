import { useState, useMemo } from 'react';
import {
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Autocomplete,
    Stack,
} from '@mui/material';
import { useGetLobbies, useCreateLobby } from '../hooks/useLobbies';
import { useFetchGames } from '../hooks/useGames';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import PageLayout from '../layouts/PageLayout';
import { useMatches } from '../hooks/useMatches';
import MatchCard from '../components/MatchCard/MatchCard';

// ✅ type-only imports so assertions compile but runtime stays identical
import type { Lobby } from '../types/Lobby';
import type { Match } from '../types/Match';

type Game = { id: string; name: string };

type LobbyType = {
    id?: string;
    lobbyId?: string;
    createdDate?: string | number | Date;
    [key: string]: any;
};

type MatchType = {
    id?: string;
    matchId?: string;
    dateCreated?: string | number | Date;
    [key: string]: any;
};

const toTime = (value?: string | number | Date) =>
    new Date(value ?? 0).getTime();

const Lobby = () => {
    const { lobbies, isError: lobbiesLoadError, isLoading: lobbiesLoading } = useGetLobbies();
    const { matches, isError: matchesLoadError, isLoading: matchesLoading } = useMatches();
    const { games, isPending: isLoadingGames, isError: isErrorGames } = useFetchGames();
    const { createLobby } = useCreateLobby();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    const sortedLobbies: LobbyType[] = useMemo(() => {
        const arr = (lobbies ?? []) as LobbyType[];
        return [...arr].sort((a, b) => toTime(b.createdDate) - toTime(a.createdDate));
    }, [lobbies]);

    const sortedMatches: MatchType[] = useMemo(() => {
        const arr = (matches ?? []) as MatchType[];
        return [...arr].sort((a, b) => toTime(b.dateCreated) - toTime(a.dateCreated));
    }, [matches]);

    const renderLobbies = () => {
        if (lobbiesLoading) return <CircularProgress color="secondary" />;
        if (lobbiesLoadError) return <Typography color="error">Failed to load lobbies.</Typography>;

        return (
            <Stack sx={{ width: '100%' }}>
                {sortedLobbies.length ? (
                    sortedLobbies.map((lobby, idx) => {
                        const key =
                            (lobby.id ?? lobby.lobbyId ?? lobby.createdDate ?? idx).toString();
                        // 👇 assert to required prop type; no runtime change
                        return <LobbyCard key={key} lobby={lobby as Lobby} />;
                    })
                ) : (
                    <Typography>No active lobbies available.</Typography>
                )}
            </Stack>
        );
    };

    const renderMatches = () => {
        if (matchesLoading) return <CircularProgress color="secondary" />;
        if (matchesLoadError) return <Typography color="error">Failed to load matches.</Typography>;

        return (
            <>
                {sortedMatches.length ? (
                    sortedMatches.map((match, idx) => {
                        const key =
                            (match.id ?? match.matchId ?? match.dateCreated ?? idx).toString();
                        // 👇 assert to required prop type; no runtime change
                        return <MatchCard key={key} match={match as Match} />;
                    })
                ) : (
                    <Typography>You have no ongoing matches.</Typography>
                )}
            </>
        );
    };

    const handleCreateLobby = async () => {
        if (!selectedGame) return;
        await createLobby(selectedGame.id);
        setOpenDialog(false);
        setSelectedGame(null);
    };

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
                        <CircularProgress />
                    ) : isErrorGames ? (
                        <Typography color="error">Failed to load games.</Typography>
                    ) : (
                        <Autocomplete<Game, false, false, false>
                            options={(games ?? []) as Game[]}
                            value={selectedGame}
                            getOptionLabel={(option) => option?.name ?? ''}
                            isOptionEqualToValue={(opt, val) => opt.id === val.id}
                            onChange={(_, value) => setSelectedGame(value)}
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
                    <Button onClick={handleCreateLobby} color="primary" disabled={!selectedGame}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {renderLobbies()}

            <Button
                variant="contained"
                color="secondary"
                sx={{ width: 'fit-content', mt: 2 }}
                onClick={() => setOpenDialog(true)}
            >
                Create Lobby
            </Button>

            <Stack gap={2} mt={3}>
                <Typography variant="h6">Your matches</Typography>
                {renderMatches()}
            </Stack>
        </PageLayout>
    );
};

export default Lobby;
