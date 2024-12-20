import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Invite from "../../types/Invite";
import formatDate from "../../utils/formatDate";
import dayjs from 'dayjs';
import { useAcceptInvite } from "../../hooks/useAcceptInvite";

interface InviteCardProps {
    invite: Invite;
}

const InviteCard = (props: InviteCardProps) => {
    const { invite } = props;
    const acceptInvite = useAcceptInvite();

    const handleAccept = () => {
        acceptInvite.mutate(invite.id, {
            onSuccess: () => {
                console.log(`Successfully accepted invite: ${invite.id}`);
                if (invite.lobby.matchURL) {
                    window.location.href = invite.lobby.matchURL; // Navigate to lobby match URL
                }
            },
            onError: (error) => {
                console.error(`Failed to accept invite: ${error.message}`);
            },
        });
    };

    return (
        <Card sx={{ boxShadow: 2, margin: 2 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {invite.sender.username} invited you to play {invite.lobby.game.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Sent {formatDate(dayjs(invite.dateSent))}
                </Typography>

                {invite.inviteStatus === 'OPEN' && (
                    <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleAccept}
                        >
                            Accept
                        </Button>
                        <Typography variant="caption" color="text.secondary">
                            You can keep this invitation open if unsure.
                        </Typography>
                    </Box>
                )}

                {invite.inviteStatus === 'ACCEPTED' && (
                    <Typography variant="body2" color="text.success">
                        Invitation accepted! You are now in the game lobby.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default InviteCard;
