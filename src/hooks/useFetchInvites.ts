import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetch game invitations from the backend
const fetchInvites = async (): Promise<any[]> => {
    const token = localStorage.getItem('access_token'); // Retrieve the access token
    const response = await axios.get('http://localhost:8091/api/invites', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data; // Return the invitations
};

// React Query Hook for fetching invites
export const useFetchInvites = () => {
    return useQuery({
        queryKey: ['invites'], // Unique key to identify this query
        queryFn: fetchInvites, // Function to fetch datas
    });
};
