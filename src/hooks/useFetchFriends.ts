import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Friend } from '../types/Friend'; // Define the Friend type

const fetchFriends = async (): Promise<Friend[]> => {
    const token = localStorage.getItem('access_token'); // Adjust if the token is stored differently

    console.log("local token: " + token);

    if (!token) {
        throw new Error('No access token found');
    }

    const response = await axios.get('http://localhost:8091/api/friends', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

// Hook for fetching friends
export function useFetchFriends() {
    return useQuery({
        queryKey: ['friends'],
        queryFn: fetchFriends,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}
