import { Game } from "./Game";
import Player from "./Player";

export interface Lobby {
    id: string;
    game: Game;
    lobbyStatus: string;
    createdBy: Player;
    matchURL: string;
    createdDate: string;
}
