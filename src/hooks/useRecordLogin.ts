import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { joinLobby } from '../services/lobbiesService';
import { useNavigate } from 'react-router-dom';
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
