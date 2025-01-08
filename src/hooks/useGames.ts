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
        data: data || [],
        isLoading,
        isError: !!error,
    };
}
