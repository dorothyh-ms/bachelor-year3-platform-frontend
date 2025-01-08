import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { Match } from "../../types/Match";
import CasinoIcon from '@mui/icons-material/Casino';
import dayjs from 'dayjs';
import formatDate from "../../utils/formatDate";
interface MatchCardProps {
    match : Match;
}

const MatchCard = (props: MatchCardProps) => {

    const {match} = props;
    return <Card sx={{ boxShadow: 2, width:  "20rem" }} >
        <CardContent sx={{ display: "flex", flexDirection: "column", }}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography variant="body2" color="text.success">
                 Play {match.gameName} against {match.opponentName} 
                </Typography>
            </Stack>
            <Typography variant="caption" color="text.success">
                Created {formatDate(dayjs(match.dateCreated))}
            </Typography>
            <CardActions disableSpacing sx={{padding: 0}}>
                <Button
                    onClick={() => {
                        
                        const newWindow = window.open(match.url, '_blank', 'noopener,noreferrer')
                        if (newWindow) newWindow.opener = null
                    }}
                    color="success"
                    variant="contained"
                    startIcon={<CasinoIcon />}
                    sx={{ width: "fit-content", marginTop: 1 }}
                >
                    Go to match
                </Button>
            </CardActions>

        </CardContent>
    </Card>
}

export default MatchCard;