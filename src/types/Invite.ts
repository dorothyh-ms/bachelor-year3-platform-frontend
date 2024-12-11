import { Lobby } from "./Lobby";
import Player from "./Player";

type Invite = {
    id: string;
    sender : Player;
    recipient : Player;
    lobby : Lobby;
    inviteStatus : string;
    dateSent: string;

}

export default Invite;