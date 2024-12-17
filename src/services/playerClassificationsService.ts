import { PlayerGameClassification } from "../types/PlayerGameClassification";
import axios from "./axios";

export const fetchPlayerGameClassifications = async (): Promise<PlayerGameClassification[]> => {
    const response = await axios.get('/player-classifications/me');
    return response.data;
};