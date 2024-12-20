import { useQuery } from '@tanstack/react-query';
import axiosApi from '../services/axios';
import { Player } from '../types/Player';

// Fetch function to get players
const searchPlayersByUsername = async (username: string): Promise<Player[]> => {
    const response = await axiosApi.get(`/players/search?username=${username}`);
    return response.data;
};

// Custom hook for searching players
export const useSearchPlayers = (username: string) => {
    return useQuery({
        queryKey: ['searchPlayers', username], // Proper query key
        queryFn: () => searchPlayersByUsername(username), // Fetch function
        enabled: Boolean(username),
    });
};
