import {Game} from "../types/Game";
import api from "./axios";

export async function getGames(): Promise<Game[]> {
    try {
        const response = await api.get("/games");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
            return response.data;
        }
        if (response.data?.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        throw new Error("Invalid API response format");
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}



