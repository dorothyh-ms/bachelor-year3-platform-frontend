import { useContext } from 'react';
import { Typography, CircularProgress, Grid2 } from '@mui/material';
import PageLayout from '../layouts/PageLayout';
import SecurityContext from '../context/SecurityContext';
import { useFetchPlayerGameClassifications } from '../hooks/usePlayerGameClassifications';
import ClassificationCard from '../components/ClassificationCard/ClassificationCard';

import { useGameRecommendations } from '../hooks/useGameRecommendations';
import RecommendationCard from '../components/RecommendationCard/RecommendationCard';



const Home = () => {
    const { loggedInUser } = useContext(SecurityContext);
    const { classifications, isLoading: classificationsLoading, isError: classificationsError } = useFetchPlayerGameClassifications();

    const renderGameClassifications = () => {
        if (classificationsLoading) return <CircularProgress color="secondary" />;
        if (classificationsError) return <Typography>Your classifications could not be loaded.</Typography>;
        if (classifications)
            return <Grid2 container spacing={2}>
                {classifications.map(classification => 
                <Grid2 size={{xs:12, lg: 4}}>
                <ClassificationCard classification={classification} />
                </Grid2>
                )
                }
            </Grid2>
    }

    const renderAchievements = () => {
     return null;
    }
    return (
        <PageLayout title={loggedInUser?.username ? `Welcome back, ${loggedInUser.username}` : "Home"} >
            <Typography variant="h6" >
                Your achievements
            </Typography>
            {renderAchievements()}
            <Typography variant="h6" >
                Your classifications
            </Typography>
            {renderGameClassifications()}
        </PageLayout>
    );
};

export default Home;
