
import { Typography, CircularProgress, Stack } from '@mui/material';
import PageLayout from '../layouts/PageLayout';
import InviteCard from '../components/InviteCard/InviteCard';
import { useFetchInvites } from '../hooks/useInvites';

const InvitationsPage = () => {
    const { invites, isLoading, isError } = useFetchInvites();

    const renderInvitations = () => {
        if (isLoading) return <CircularProgress color='secondary' />
        if (isError) return <Typography color="error">Failed to load invitations.</Typography>
        if (!invites || invites.length < 1){
            return <Typography >You have no outstanding invitations.</Typography>
        }
        return (
            <Stack  spacing={2}>
                {invites && invites.sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime()).map((invite) => (

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

export default InvitationsPage;


