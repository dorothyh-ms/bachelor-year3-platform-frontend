import {Alert, Box, CircularProgress, Grid, Typography} from "@mui/material";
import {useGameSubmissions} from "../hooks/useGameSubmissions";
import PageLayout from "../layouts/PageLayout";
import GameCard from "../components/GameCard/GameCard"; // Reuse GameCard for display
import GameSubmission from "../types/GameSubmission";
import {transformGameSubmission} from "../utils/transformGameSubmission"; // Import the transformation function

const AdminGameListPage = () => {
    const {data: gameSubmissions, isLoading, isError} = useGameSubmissions();

    return (
        <PageLayout title="Game Submissions">
            {/* Loading State */}
            {isLoading && (
                <Box sx={{display: "flex", justifyContent: "center", padding: 4}}>
                    <CircularProgress color="secondary"/>
                </Box>
            )}

            {/* Error State */}
            {isError && (
                <Alert severity="error">
                    Failed to load game submissions. Please try again later.
                </Alert>
            )}

            {/* Game Submissions Grid */}
            {gameSubmissions && (
                <Grid container spacing={2}>
                    {gameSubmissions.map((submission: GameSubmission) => (
                        <Grid item xs={12} sm={6} md={4} key={submission.id}>
                            <GameCard game={transformGameSubmission(submission)}/>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* No Content */}
            {gameSubmissions?.length === 0 && (
                <Typography textAlign="center" marginTop={4}>
                    No game submissions available.
                </Typography>
            )}
        </PageLayout>
    );
};

export default AdminGameListPage;
