import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnswerForQuestion } from "../services/chatbotService";

export function useChatbot() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: getAnswerForQuestion,
       
    });

    return {
        isLoading: isPending,
        isError,
        queryChatbot: mutate
    }
}
