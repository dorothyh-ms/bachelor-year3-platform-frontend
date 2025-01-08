import { Game } from "./Game";
import { Player } from "./Player";

export type PlayerAchievement = {
    id : string;
    player: Player;
    achievement: Achievement
    
}

type Achievement = {
    game: Game;
    name: string;
    description: string;
    id: string;

}