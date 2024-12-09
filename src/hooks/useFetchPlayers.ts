// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
//
// // Function to fetch players
// const fetchPlayers = async (username: string = '') => {
//     const token = localStorage.getItem('access_token');
//     const response = await axios.get(`http://localhost:8091/api/players?username=${username}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//     });
//     return response.data;
// };
//
// // React Query Hook for fetching players
// export function useFetchPlayers(username: string = '') {
//     return useQuery({
//         queryKey: ['players', username],
//         queryFn: () => fetchPlayers(username),
//         retry: 1,
//         refetchOnWindowFocus: false,
//     });
// }

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetch game invitations from the backend
const fetchInvites = async (): Promise<any[]> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get('http://localhost:8091/api/invites', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

// React Query Hook for fetching invites
export const useFetchInvites = () => {
    return useQuery({
        queryKey: ['invites'],
        queryFn: fetchInvites,
    });
};
