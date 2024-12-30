
import { GameRecommendation } from "../types/GameRecommendation";
import axios from "./axios";

export const fetchGameRecommendations = async (): Promise<GameRecommendation[]> => {
    const response = await axios.get('/game-recommendations');
    return response.data;
};