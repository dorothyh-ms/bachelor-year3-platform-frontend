import {Game} from "./Game.ts";
import {Player} from "./Player.ts";

export interface Lobby {
    id: string;
    game: Game;
    lobbyStatus: string;
    createdBy: Player;
    matchURL: string;
    createdDate: string;
}
