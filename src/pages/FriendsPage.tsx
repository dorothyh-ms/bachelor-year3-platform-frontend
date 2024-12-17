import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from '@mui/material';
import FriendList from '../components/FriendList.tsx';
import FriendSearch from '../pages/FriendSearch.tsx';
import { useFetchFriends } from '../hooks/useFetchFriends';
import { useSearchPlayers } from '../hooks/useSearchPlayers';
import { addFriend } from '../services/friendsService.ts';
import { useQueryClient } from '@tanstack/react-query';

const FriendsPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [selectedFriend, setSelectedFriend] = useState<{ id: string; name: string } | null>(null);
    const { friends, isLoading: isFriendsLoading, isError: isFriendsError } = useFetchFriends();
    const { data: playerResults = [], isLoading: isSearching } = useSearchPlayers(query);

    const queryClient = useQueryClient();

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
    };

    const handleOpenDialog = (id: string, name: string) => {
        setSelectedFriend({ id, name });
    };

    const handleCloseDialog = () => {
        setSelectedFriend(null);
    };

    const handleAddFriend = async () => {
        if (!selectedFriend) return;

        try {
            await addFriend(selectedFriend.id);
            queryClient.invalidateQueries(['friends']);
        } finally {
            handleCloseDialog();
        }
    };

    return (
        <Container maxWidth="lg">
            {/* Friends List Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Friends
                </Typography>
                {isFriendsLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
                {isFriendsError && (
                    <Typography color="error" align="center">
                        There was an error loading your friends. Please try again later.
                    </Typography>
                )}
                {!isFriendsLoading && !isFriendsError && (
                    <FriendList query={query} friends={friends || []} />
                )}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Search and Add Friends Section */}
            <Box>
                <Typography variant="h4" gutterBottom>
                    Search and Add Friends
                </Typography>
                <FriendSearch onSearch={handleSearch} />

                <Box sx={{ mt: 4 }}>
                    {isSearching && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {!isSearching && playerResults.length === 0 && query && (
                        <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
                            No players found matching "{query}".
                        </Typography>
                    )}
                    {!isSearching && playerResults.length > 0 && (
                        <Grid container spacing={2}>
                            {playerResults.map((player) => (
                                <Grid item xs={12} sm={6} md={4} key={player.playerId}>
                                    <Card variant="outlined" sx={{ maxWidth: 300, margin: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">{player.username}</Typography>
                                            <Typography color="text.secondary">
                                                ID: {player.playerId}
                                            </Typography>
                                            <Box mt={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        handleOpenDialog(player.playerId, player.username)
                                                    }
                                                >
                                                    Add Friend
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={!!selectedFriend} onClose={handleCloseDialog}>
                <DialogTitle>Add Friend</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to send a friend request to{' '}
                        <strong>{selectedFriend?.name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleAddFriend} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default FriendsPage;
