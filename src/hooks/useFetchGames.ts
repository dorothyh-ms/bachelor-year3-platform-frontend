import {getGames} from "../services/dataService.ts"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {Game} from '../types/Game.ts'
import keycloak from "../keycloak.ts";
import api from "../services/axios.ts";

// const fetchGames = async (): Promise<Game[]> => {
//     const token= localStorage.getItem('access_token') // Adjust this to where you store the token
//
//     console.log("local token: "+token)
//
//     console.log("keycloak token: "+keycloak.token)
//     if (!token) {
//         throw new Error('No access token found');
//     }
//
//     const response = await axios.get('http://localhost:8092/api/games', {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//     });
//
//     return response.data;
// };


export function useFetchGames(){
    const {isLoading, isError, data: games} = useQuery({queryKey: ['games'], queryFn: () => getGames()})
    console.log("test 1")
    console.log(games)
    return {
        isLoading,
        isError,
        data: games,
    }
}


// // Hook for fetching lobbies
// export function useFetchGames() {
//     return useQuery({
//         queryKey: ['games'],
//         queryFn: fetchGames,
//         retry: 1, // Retry once if there's an error
//         refetchOnWindowFocus: false, // Prevent refetching on window focus
//     });
// }