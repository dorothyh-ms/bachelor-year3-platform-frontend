import {Game} from "../types/Game.ts";
import api from "./axios.ts";

export async function getGames(){
    const {data: games} = await api.get<Game[]>("/games")
    return games
}