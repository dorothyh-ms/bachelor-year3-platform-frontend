
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress, Stack } from '@mui/material';
import { mockInvitations } from '../utils/mockData'; // Import mock data
import PageLayout from '../layouts/PageLayout';
import InviteCard from '../components/InviteCard/InviteCard';
import { useFetchInvites } from '../hooks/useInvites';

const GameInvitations = () => {
    const { invites, isLoading, isError } = useFetchInvites();

    const renderInvitations = () => {
        if (isLoading) return <CircularProgress color='secondary' />
        if (isError) return <Typography color="error">Failed to load invitations.</Typography>
        if (!invites || invites.length < 1) {
            return <Typography >You have no pending invitations.</Typography>
        }
        return (
            <Stack sx={{width: {xs: "50%", lg: "25%"}}} spacing={2}>
                {invites && invites.map((invite) => (

                    <InviteCard invite={invite} />

                ))}
            </Stack>
        )

    }
    return (
        <PageLayout title="Your invitations">
            {renderInvitations()}
        </PageLayout>
    );
};

export default GameInvitations;


