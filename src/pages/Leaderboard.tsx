import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';

// Mock leaderboard data
const mockLeaderboard = [
    { id: 1, name: 'Player #1', points: 4500, level: 4, avatar: '' },
    { id: 2, name: 'Player #2', points: 4200, level: 4, avatar: '' },
    { id: 3, name: 'Player #3', points: 3900, level: 3, avatar: '' },
];

const Leaderboard = () => {
    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f0f4f8' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#4CAF50' }}>
                Leaderboard
            </Typography>
            <Typography align="center" sx={{ marginBottom: '1.5rem', color: '#555' }}>
                See the top players on the platform!
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {mockLeaderboard.map((player, index) => (
                    <Grid item xs={12} sm={6} md={4} key={player.id}>
                        <Card
                            sx={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,
                                    bgcolor: index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze',
                                    marginRight: '1rem',
                                }}
                            >
                                {player.name[0]}
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">{player.name}</Typography>
                                <Typography variant="body2">Points: {player.points}</Typography>
                                <Typography variant="body2">Level: {player.level}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Leaderboard;
