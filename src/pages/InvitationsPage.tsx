
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { mockInvitations } from '../utils/mockData'; // Import mock data
import PageLayout from '../layouts/PageLayout';
import InviteCard from '../components/InviteCard/InviteCard';
import { useFetchInvites } from '../hooks/useInvites';

const GameInvitations = () => {
    const { invites, isLoading, isError } = useFetchInvites();

    const renderInvitations = () => {
        if (isLoading) return <CircularProgress color='secondary' />
        if (isError) return <Typography color="error">Failed to load invitations.</Typography>
        if (!invites || invites.length < 1){
            return <Typography >You have no pending invitations.</Typography>
        }
        return (
            <Grid container spacing={2}>
                {invites && invites.map((invite) => (
                    <Grid item xs={12} sm={6} md={4} key={invite.id}>
                        <InviteCard invite={invite} />
                    </Grid>
                ))}
            </Grid>
        )

    }
    return (
        <PageLayout title="Your invitations">
            {renderInvitations()}
        </PageLayout>
    );
};

export default GameInvitations;


