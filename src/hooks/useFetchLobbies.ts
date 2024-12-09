import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch lobbies
const fetchLobbies = async () => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('http://localhost:8091/api/lobbies', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// React Query Hook for fetching lobbies
export function useFetchLobbies() {
    return useQuery({
        queryKey: ['lobbies'],
        queryFn: fetchLobbies,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}
