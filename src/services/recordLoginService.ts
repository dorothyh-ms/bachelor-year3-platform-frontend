import axios from "./axios";

export async function loggedIn()    {
    const {data: login} = await axios.post(`/player-profiles/me/logins`);
    return login;
}

export async function playerProfiles()    {
    const {data: login} = await axios.post(`/player-profiles/me/logins`);
    return login;
}