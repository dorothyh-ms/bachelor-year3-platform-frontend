import GamePublishRequest from "../types/GamePublishRequest";
import axios from "./axios";

export async function createGamePublishRequest (gamePublishRequest : GamePublishRequest): Promise<void> {
    await axios.post(`/game-publish-requests`, gamePublishRequest)
}
