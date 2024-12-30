import {useQuery} from "@tanstack/react-query";
import {getGames} from "../services/gamesService";

export function useFetchGames() {
    const {data, error, isLoading} = useQuery({
        queryKey: ["games"],
        queryFn: getGames,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        games: data || [], // Default to an empty array if data is undefined
        isLoading,
        isError: !!error,
    };
}
