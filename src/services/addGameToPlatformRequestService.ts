import GamePublishRequest from "../types/GamePublishRequest";
import axios from "./axios";

export async function createGamePublishRequest(gamePublishRequest: GamePublishRequest): Promise<void> {
    const formData = new FormData();
    formData.append("name", gamePublishRequest.name);
    formData.append("genre", gamePublishRequest.genre);
    formData.append("difficultyLevel", gamePublishRequest.difficultyLevel);
    formData.append("price", gamePublishRequest.price.toString());
    formData.append("description", gamePublishRequest.description);
    formData.append("image", gamePublishRequest.image); // File object
    formData.append("url", gamePublishRequest.url);

    await axios.post("/game-submissions", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
}
