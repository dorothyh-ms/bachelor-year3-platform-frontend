import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Lobby } from '../types/Lobby';

// Function to fetch lobbies
const fetchLobbies = async (): Promise<Lobby[]> => {
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJoa0VKUWJUOXh4dzZMQk9iZEhuOEIwakI0Snl6LVRBQTBuTldtUllfZ3pzIn0.eyJleHAiOjE3MzI1Mzg2MTEsImlhdCI6MTczMjUzODMxMSwianRpIjoiYzE4MmZkZDgtYTllZS00OTA5LWFkY2ItNGQ2NjRjMDc0NDNhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL3JlYWxtcy9iYW5kaXRnYW1lcyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmZmYyZGViNy03YmYyLTQzZDUtODg5Ny00ZGRkOGVkYzZhYjEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYW5kaXRnYW1lcy1jbGllbnQiLCJzaWQiOiIxYTdkODMxOC1kOTMzLTQ5ZDAtOWJmYS05M2IyMDE2NGVlZDEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYmFuZGl0Z2FtZXMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwicGxheWVyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoicGxheWVyMSBwbGF5ZXIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoicGxheWVyMSIsImdpdmVuX25hbWUiOiJwbGF5ZXIxIiwiZmFtaWx5X25hbWUiOiJwbGF5ZXIxIiwiZW1haWwiOiJwbGF5ZXIxQGVtYWlsLmNvbSJ9.Yrg6Rwnm_hqo_rRkn2OYGWqL3DWSkDGlAjaVFlzGu8DFqoN-20UOvb5F_HZubyDXhT52cL408zErrmXQQQReLeAQ2c3izj89-F4xjDLsOVEWjC0vpdU6LzF-BoaeC2fb8AYcXhm5IP-xY7wAfM5_foWcleFTZcl4RYnEK45X5E4NMpK6ZoYQ34dYUfgQ7KwokkKGeacc0xJCEboYRLzOqBM_6YfuCnUB0bxRi1bYRCrFGettcsf8yFCmb2hCIrsKI-I8kEDMYnq7MHZjeaIgqRSZUqeqYoKw4y_aBwAFPyLE836_ZXWd_NLUVI0fBMwpdY13CpBKIW6uG4U12jRP9Q"; // Adjust this to where you store the token

    const response = await axios.get('http://localhost:8091/api/lobbies', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

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
