import { Game } from "../types/Game";
import api from "./axios";

export async function getGames() : Promise<Game[]>   {
    const {data: games} = await api.get<Game[]>(`/games`);
    return games;
}