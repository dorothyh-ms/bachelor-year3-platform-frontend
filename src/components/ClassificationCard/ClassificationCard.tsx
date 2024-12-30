import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";
import { PlayerGameClassification } from "../../types/PlayerGameClassification";
import gameImage from "../../assets/images/banditgames-mascot.png";
import formatSeconds from "../../utils/formatSeconds";

interface ClassificationCardProps {
    classification: PlayerGameClassification
}

const ClassificationCard = (props: ClassificationCardProps) => {
    const {classification} = props;
    return (
        <Card sx={{ display: 'flex', width: "fit-content" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ width: {xs: "8em", md: "16em"} }}>
            <Typography component="div" variant="h6">
              {classification.gameName}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {classification.classification}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Wins: {classification.totalWins}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Losses: {classification.totalLosses}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              Matches played: {classification.totalMatchesPlayed}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
            Play time: {formatSeconds(classification.totalSecondsPlayed)}
            </Typography>
          </CardContent>
         
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={gameImage}
          alt="Live from space album cover"
        />
      </Card>
    );
};

export default ClassificationCard;