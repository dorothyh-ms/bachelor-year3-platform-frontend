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
    const { recommendations, isLoading: recommendationsLoading, isError: recommendationsError } = useGameRecommendations();
    console.log(recommendations)
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

    const renderGameRecommendations = () => {
        if (recommendationsLoading) return <CircularProgress color="secondary" />;
        if (recommendationsError) return <Typography>Your recommendations could not be loaded.</Typography>;
        if (recommendations)
            return <Grid2 container spacing={2} >
                {recommendations.map(recommendation =>
                    <Grid2 size={{xs: 12, sm: 6, md: 4, xl: 3 }}>
                        <RecommendationCard recommendation={recommendation} />
                    </Grid2>
                )}
            </Grid2>
    }
    return (
        <PageLayout title={loggedInUser ? `Welcome back, ${loggedInUser.username}` : "Home"} >
            <Typography variant="h6" >
                Recommended for you
            </Typography>
            {renderGameRecommendations()}
            <Typography variant="h6" >
                Your classifications
            </Typography>
            {renderGameClassifications()}
        </PageLayout>
    );
};

export default Home;
