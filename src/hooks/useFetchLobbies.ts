import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch lobbies
const fetchLobbies = async (): Promise<any[]> => {
    const response = await axios.get('http://localhost:8091/api/lobbies');
    return response.data;
};

// Hook for fetching lobbies
export function useFetchLobbies() {
    return useQuery({
        queryKey: ['lobbies'],
        queryFn: fetchLobbies,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}
