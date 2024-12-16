import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from "../services/profileService";


// Hook for fetching lobbies
export function useFetchProfile() {
    const {data: profile, isPending: isLoading, isError} = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
    return {
        profile, isLoading, isError
    }
}