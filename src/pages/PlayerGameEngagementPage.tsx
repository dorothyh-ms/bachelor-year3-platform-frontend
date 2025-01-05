import PageLayout from "../layouts/PageLayout";
import PlayerGameEngagementLineChart from "../components/PlayerGameEngagementChart/PlayerGameEngagementChart";
import { usePlayerGameEngagementPredictions } from "../hooks/usePlayerGameEngagementPredictions";
import { Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const PlayerEngagementPredictionPage = () => {
    

    const getQueryParams = () => {
        const location = useLocation();
        const params = new URLSearchParams(location.search);
        return {
          username: params.get('username'),
          gameName: params.get('game_name'),
        };
      };
    
      const { username, gameName } = getQueryParams();




    const { predictions } = usePlayerGameEngagementPredictions(username || "", gameName|| "");
   
    return <PageLayout title={`Predicted ${gameName} week engagement for "${username}"`} >
        {predictions &&
            <Paper sx={{ width: { xs: "100%", md: "75%" }, display: "flex", flexDirection: "column", alignItems: "center", height: "24em", backgroundColor: "white", padding:3 }}>
               
                <PlayerGameEngagementLineChart data={predictions} />
            </Paper>
        }
    </PageLayout>
}

export default PlayerEngagementPredictionPage;