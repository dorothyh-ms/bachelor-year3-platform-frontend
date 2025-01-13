import axios from "./axios";
import GameSubmission from "../types/GameSubmission";

export async function fetchGameSubmissions(): Promise<GameSubmission[]> {
    const response = await axios.get("/game-submissions");
    return response.data;
}

export async function fetchMySubmissions(): Promise<GameSubmission[]> {
    const response = await axios.get("/game-submissions/my-submissions");
    return response.data;
}
