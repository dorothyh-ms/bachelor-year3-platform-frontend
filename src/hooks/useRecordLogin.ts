import { useMutation } from '@tanstack/react-query';
import { loggedIn } from '../services/recordLoginService';

export function useRecordLogin() {
    const { mutate, isPending, isError } = useMutation({
        mutationFn: loggedIn,
       
    });

    return {
        isLoading: isPending,
        isError,
        recordLogin: mutate
    }
}
