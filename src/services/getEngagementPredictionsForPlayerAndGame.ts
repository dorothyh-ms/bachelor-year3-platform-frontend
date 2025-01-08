import { PlayerEngagementPredictions } from "../types/PlayerGameEngagementPredictions";
import api from '../services/axios';


export async function getEngagementPredictionsForPlayerAndGame(username : string, gameName: string) : Promise<PlayerEngagementPredictions> {
    const {data : predictions} = await api.get<PlayerEngagementPredictions>(`/engagement?username=${username}&game_name=${gameName}`)
    return predictions;
}