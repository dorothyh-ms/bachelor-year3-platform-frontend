import { Game } from "./Game";
import Player from "./Player";

export interface Lobby {
    id: string;
    game: Game;
    lobbyStatus: string;
    createdBy: Player;
    matchUrl: string;
    createdDate: string;
}
