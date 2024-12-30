import { Game } from "../types/Game";
import api from "./axios";

export async function getGames() : Promise<Game[]>   {
    const {data: games} = await api.get<Game[]>(`/games`);
    return games;
}

export async function getGame(id : string) : Promise<Game> {
    const {data : game} = await api.get<Game>(`/games/${id}`)
    return game;
}