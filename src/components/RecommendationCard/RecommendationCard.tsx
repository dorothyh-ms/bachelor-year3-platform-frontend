import { Card, Box, CardContent, Typography, CardMedia } from "@mui/material";
import { GameRecommendation } from "../../types/GameRecommendation"
import gameImage from '../../assets/images/banditgames-mascot.png'
interface RecommendationCardProps {
    recommendation: GameRecommendation
}

const RecommendationCard = (props: RecommendationCardProps) => {

    const { recommendation } = props;
    return (
        <Card sx={{ display: 'flex', width: "fit-content" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ width: { xs: "8em", md: "16em" } }}>
                    <Typography component="div" variant="h6">
                        {recommendation.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {recommendation.description && recommendation.description}
                    </Typography>

                </CardContent>

            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={gameImage}
                alt="Live from space album cover"
            />
        </Card>)
}

export default RecommendationCard;