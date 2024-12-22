import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFriend, fetchFriends } from '../services/friendsService.ts';

// Hook for fetching friends
export function useFetchFriends() {
    const { data: friends, isPending: isLoading, isError } = useQuery({
        queryKey: ['friends'], // Cache key
        queryFn: fetchFriends, // API service function
        retry: 1, // Retry once if there's an error
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    });

    return {
        friends,
        isLoading,
        isError,
    };
}


export function useAddFriend() {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: addFriend,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friends'] });
            
        },
    });

    return {
        isLoading: isPending,
        isError,
        addFriend: mutate
    }
}