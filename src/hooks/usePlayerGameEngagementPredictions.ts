import { useQuery } from "@tanstack/react-query";
import { getEngagementPredictionsForPlayerAndGame } from "../services/getEngagementPredictionsForPlayerAndGame";

export const usePlayerGameEngagementPredictions = (username: string, gameName: string) => {
    const {data: predictions, isError, isPending} = useQuery({
        queryKey: ['engagement-predictions', username, gameName], 
        queryFn: () => getEngagementPredictionsForPlayerAndGame(username, gameName), 
       enabled: Boolean(username) && Boolean(gameName)
    })

    return {
        predictions, 
        isError, 
        isPending
    }
};
