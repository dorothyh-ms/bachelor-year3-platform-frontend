import {useQuery} from "@tanstack/react-query";
import {fetchGameSubmissions} from "../services/gameSubmissionService";

export function useGameSubmissions() {
    return useQuery({
        queryKey: ["gameSubmissions"],
        queryFn: fetchGameSubmissions,
    });
}
