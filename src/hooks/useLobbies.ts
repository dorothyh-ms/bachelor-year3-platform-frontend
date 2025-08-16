// src/hooks/useLobbies.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createLobby, fetchLobbies, joinLobby, leaveLobby, fetchLobby } from "../services/lobbiesService";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../types/Lobby";
import { LOBBIES } from "../constants/routes";
import { deleteLobby } from "../services/lobbiesService";

export function useLobby(lobbyId?: string) {
    const query = useQuery({
        queryKey: ["lobby", lobbyId],
        queryFn: () => fetchLobby(lobbyId as string),
        enabled: !!lobbyId,
        refetchOnWindowFocus: false,
    });

    return {
        lobby: (query.data as Lobby) ?? null,
        isLoading: query.isPending,
        isError: query.isError,
        refetch: query.refetch,
    };
}

export function useGetLobbies() {
    const { data: lobbies, isPending, isError } = useQuery({
        queryKey: ["lobbies"],
        queryFn: fetchLobbies,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        isLoading: isPending,
        isError: isError,
        lobbies,
    };
}

export function useLeaveLobby() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (lobbyId: string) => leaveLobby(lobbyId),
        onSuccess: (_data, lobbyId) => {
            queryClient.invalidateQueries({ queryKey: ["lobbies"] });
            navigate(LOBBIES);
        },
    });

    return { leaveLobby: mutate, isLoading: isPending, isError };
}

export function useCreateLobby(customOnSuccess?: (lobbyId: string) => void) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: createLobby,
        onSuccess: async (createdLobby, variables) => {
            queryClient.invalidateQueries({ queryKey: ["lobbies"] });
            if (createdLobby) {
                navigate(`/lobbies/${createdLobby.id}`);
                if (customOnSuccess) customOnSuccess(createdLobby.id);
            }
        },
    });

    return { createLobby: mutate, isLoading: isPending, isError };
}

export function useDeleteLobby() {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: deleteLobby,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lobbies"] });
        },
    });

    return { deleteLobby: mutate, isLoading: isPending, isError };
}

export function useJoinLobby() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (lobbyId: string) => joinLobby(lobbyId),
        onSuccess: (_data, lobbyId) => {
            queryClient.invalidateQueries({ queryKey: ["lobbies"] });
            queryClient.invalidateQueries({ queryKey: ["matches"] });
            navigate(`/lobbies/${lobbyId}`);
        },
    });

    return {
        isLoading: isPending,
        isError,
        joinLobby: mutate,
    };
}