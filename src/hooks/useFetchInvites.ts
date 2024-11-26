import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Invite } from '../types/Invite';

// Function to fetch invites
const fetchInvites = async (): Promise<Invite[]> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("No access token found in localStorage");
            throw new Error("Access token is missing.");
        }

        const response = await axios.get('http://localhost:8091/api/invites/player', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log("Fetched invites response:", response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error("Error fetching invites:", error); // Log any error
        throw error;
    }
};


// Hook for fetching lobbies
export function useFetchInvites() {
    return useQuery({
        queryKey: ['invites'],
        queryFn: fetchInvites,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
}
