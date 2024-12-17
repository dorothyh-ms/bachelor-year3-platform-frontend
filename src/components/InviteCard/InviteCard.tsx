import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import Invite from "../../types/Invite";
import formatDate from "../../utils/formatDate";
import dayjs from 'dayjs'
interface InviteCardProps {
    invite: Invite
}
const InviteCard = (props: InviteCardProps) => {
    const { invite } = props;


    return <Card sx={{ boxShadow: 2 }}>
        <CardContent>

            <Typography variant="body2" color="text.secondary">
                {invite.recipient.username} invited you to play {invite.lobby.game.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Sent {formatDate(dayjs(invite.dateSent))}
            </Typography>

            {invite.inviteStatus === 'OPEN' && (
                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button variant="contained" color="secondary" size="small">
                        Accept
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                        Decline
                    </Button>
                </Box>
            )}
            {["ACCEPTED", "DECLINED"].includes(invite.inviteStatus) && (
                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Typography variant="caption" color="text.primary">
                        {invite.inviteStatus}
                    </Typography>
                </Box>
            )}
        </CardContent>
    </Card>
}

export default InviteCard;