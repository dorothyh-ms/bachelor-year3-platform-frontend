import React, { useContext } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Stack } from '@mui/material';
import PageLayout from '../layouts/PageLayout';
import SecurityContext from '../context/SecurityContext';
import { useFetchPlayerGameClassifications } from '../hooks/usePlayerGameClassifications';
import ClassificationCard from '../components/ClassificationCard/ClassificationCard';

import { useGameRecommendations } from '../hooks/useGameRecommendations';
import RecommendationCard from '../components/RecommendationCard/RecommendationCard';



const Home = () => {
    const {loggedInUser} = useContext(SecurityContext);
    const {classifications, isLoading: classificationsLoading, isError: classificationsError} = useFetchPlayerGameClassifications();
    const {recommendations, isLoading: recommendationsLoading, isError: recommendationsError} = useGameRecommendations();
    console.log(recommendations)
    const renderGameClassifications = () => {
        if (classificationsLoading) return <CircularProgress color="secondary"/>;
        if (classifications)
            return <Stack gap={2}>
        {classifications.map(classification => <ClassificationCard classification={classification}/>)}
        </Stack>
    }

    const renderGameRecommendations = () => {
        if (recommendationsLoading) return <CircularProgress color="secondary"/>;
        if (recommendations)
            return <Stack gap={2}>
        {recommendations.map(recommendation => <RecommendationCard recommendation={recommendation}/>)}
        </Stack>
    }
    return (
        <PageLayout title={loggedInUser ? `Welcome back, ${loggedInUser.username}`: "Home"} >
            <Typography variant="h6" >
                Recommended for you
            </Typography>
            {renderGameRecommendations()}
            <Typography variant="h6" >
                Game classifications
            </Typography>
            {renderGameClassifications()}
        </PageLayout>
    );
};

export default Home;
