import {useQuery} from '@tanstack/react-query';
import {fetchProfile} from "../services/profileService";


export function useFetchProfile() {
    const {data: profile, isPending: isLoading, isError} = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return {
        profile, isLoading, isError
    }
}