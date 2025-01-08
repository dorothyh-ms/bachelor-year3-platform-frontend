import { useContext } from 'react';
import { Typography, CircularProgress, Grid2, Stack } from '@mui/material';
import PageLayout from '../layouts/PageLayout';
import SecurityContext from '../context/SecurityContext';
import { useFetchPlayerGameClassifications } from '../hooks/usePlayerGameClassifications';
import ClassificationCard from '../components/ClassificationCard/ClassificationCard';
import { useAchievements } from '../hooks/useAchievements';
import AchievementCard from '../components/AchievementCard/AchievementCard';



const Home = () => {
    const { loggedInUser } = useContext(SecurityContext);
    const { classifications, isLoading: classificationsLoading, isError: classificationsError } = useFetchPlayerGameClassifications();
    const { achievements, isLoading: achievementsLoading, isError: achievementsError} = useAchievements();

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
     return <Stack gap={2}>
        {
            achievements && achievements.map((achievement) => <AchievementCard achievement={achievement} />)
        }
        {
            !achievements && achievementsLoading && <CircularProgress color="secondary"/>
        }
        {
            achievements && achievementsError && <Typography>Your achievements could not be loaded.</Typography>
        }
        
     </Stack>;
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
