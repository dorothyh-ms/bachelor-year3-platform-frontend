import axios from "./axios";
import axiosApi from "./axios";

export async function loggedIn() {
    try {
        const {data} = await axiosApi.post("/player-profiles/me/logins");
        return data;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        throw error;
    }
}


export async function playerProfiles() {
    const {data: login} = await axios.post(`/player-profiles/me/logins`);
    return login;
}