import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import Invite from "../../types/Invite";
import formatDate from "../../utils/formatDate";
import dayjs from 'dayjs'
import { useAcceptInvite } from "../../hooks/useInvites";
import { useNavigate } from "react-router-dom";
interface InviteCardProps {
    invite: Invite
}
const InviteCard = (props: InviteCardProps) => {
    const {invite} = props;
    const {acceptInvite}  = useAcceptInvite();
    const navigate = useNavigate();
  
    const handleAcceptInviteSuccess = () => {
        navigate()

    }

    return <Card sx={{ boxShadow: 2, width: { xs: "32rem", xl: "48rem" } }} >
    <CardContent>
        
        <Typography variant="body2" color="text.secondary">
            {invite.recipient.username} invited you to play {invite.lobby.game.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
            Sent {formatDate(dayjs(invite.dateSent))} 
        </Typography>
       
        {invite.inviteStatus === 'OPEN' && (
            <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                <Button variant="contained" color="secondary" size="small"
                onClick={() => {acceptInvite({
                    inviteId : invite.id,
                    action : "ACCEPT"
                })} }
                >
                    Accept
                </Button>
               
            </Box>
        )}
    </CardContent>
</Card>
}

export default InviteCard;