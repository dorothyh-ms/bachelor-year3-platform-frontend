import {Lobby} from "./Lobby.ts";
import {Player} from "./Player.ts";

export interface Invite {
    id: string;
    sender: Player;
    recipient: Player;
    lobby: Lobby;
    inviteStatus: string;
    dateSent: string;
}