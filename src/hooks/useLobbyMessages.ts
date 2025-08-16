import { useQuery } from "@tanstack/react-query";
import { fetchLobbyMessages } from "../services/lobbyMessagesService";
import { LobbyMessage } from "../types/LobbyMessage";

export function useLobbyMessages(lobbyId?: string) {
    const query = useQuery({
        queryKey: ["lobbyMessages", lobbyId],
        queryFn: () => fetchLobbyMessages(lobbyId as string, 50),
        enabled: !!lobbyId,
        refetchOnWindowFocus: false,
    });

    return {
        messages: (query.data as LobbyMessage[]) ?? [],
        isLoading: query.isPending,
        isError: query.isError,
        refetch: query.refetch,
    };
}
