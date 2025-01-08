import { Card, CardContent, Stack, Typography } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { PlayerAchievement } from "../../types/Achievement";

interface AchievementProps {
    achievement: PlayerAchievement;
}
const AchievementCard = (props: AchievementProps) => {
    const { achievement } = props;

    return <Card sx={{ boxShadow: 2, width: { xs: "32rem", xl: "48rem" } }} >
        <CardContent sx={{ display: "flex", flexDirection: "column", }}>

            <Stack direction={"row"} alignItems={"center"} gap={1}>
                <EmojiEventsIcon />
                <Typography variant="body2" color="text.secondary">
                 {achievement.achievement.name} • {achievement.achievement.game.name} 
                </Typography>
            </Stack>

            <Typography variant="caption" color="text.secondary">
                {achievement.achievement.description}
            </Typography>

        </CardContent>
    </Card>

}

export default AchievementCard;