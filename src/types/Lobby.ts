import {Game} from "./Game.ts";
import {Player} from "./Player.ts";

export interface Lobby {
    id: string;
    game: Game;
    initiatingPlayer: Player;
    joinedPlayer: Player;
    status: string;
    dateCreated: string;
}