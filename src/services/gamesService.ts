import {Game} from "../types/Game";
import api from "./axios";

export async function getGames(): Promise<Game[]> {
    const response = await api.get<{ data: Game[] }>("/games");
    return response.data.data;
}
