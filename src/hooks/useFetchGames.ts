import {getGames} from "../services/dataService.ts"
import { useQuery } from '@tanstack/react-query';

export function useFetchGames(){
    const {isLoading, isError, data: games} = useQuery({queryKey: ['games'], queryFn: () => getGames()})
    console.log("test 1")
    console.log(games)
    return {
        isLoading,
        isError,
        data: games,
    }
}