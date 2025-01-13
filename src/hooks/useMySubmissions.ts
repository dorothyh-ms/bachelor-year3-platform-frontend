import {useQuery} from "@tanstack/react-query";
import {fetchMySubmissions} from "../services/gameSubmissionService";

export function useMySubmissions() {
    return useQuery({
        queryKey: ["mySubmissions"],
        queryFn: fetchMySubmissions,
    });
}
