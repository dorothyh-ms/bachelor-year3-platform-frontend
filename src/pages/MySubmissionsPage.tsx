import {Alert, Box, CircularProgress, Grid, Typography} from "@mui/material";
import {useMySubmissions} from "../hooks/useMySubmissions";
import PageLayout from "../layouts/PageLayout";
import GameCard from "../components/GameCard/GameCard";
import GameSubmission from "../types/GameSubmission";
import {transformGameSubmission} from "../utils/transformGameSubmission";

const MySubmissionsPage = () => {
    const {data: mySubmissions, isLoading, isError} = useMySubmissions();

    return (
        <PageLayout title="My Submissions">
            {/* Loading State */}
            {isLoading && (
                <Box sx={{display: "flex", justifyContent: "center", padding: 4}}>
                    <CircularProgress color="secondary"/>
                </Box>
            )}

            {/* Error State */}
            {isError && (
                <Alert severity="error">
                    Failed to load your submissions. Please try again later.
                </Alert>
            )}

            {/* My Submissions Grid */}
            {mySubmissions && (
                <Grid container spacing={2}>
                    {mySubmissions.map((submission: GameSubmission) => (
                        <Grid item xs={12} sm={6} md={4} key={submission.id}>
                            <GameCard game={transformGameSubmission(submission)}/>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* No Content */}
            {mySubmissions?.length === 0 && (
                <Typography textAlign="center" marginTop={4}>
                    You have not submitted any games yet.
                </Typography>
            )}
        </PageLayout>
    );
};

export default MySubmissionsPage;
