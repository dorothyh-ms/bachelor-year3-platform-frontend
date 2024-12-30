import {Game} from "./Game";

export interface Favorite {
    favoriteId: string;
    game: Game;
    createdAt: string;
}
