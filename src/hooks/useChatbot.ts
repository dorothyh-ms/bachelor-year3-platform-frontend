import { useMutation } from "@tanstack/react-query";
import { getAnswerForQuestion } from "../services/chatbotService";

export function useChatbot(customOnSuccess?: (data : string) => void) {

    const {mutate, isPending, isError} =  useMutation({
        mutationFn: getAnswerForQuestion,
        onSuccess: (data : string) => {
            customOnSuccess && customOnSuccess(data);
        }
       
    });

    return {
        isLoading: isPending,
        isError,
        queryChatbot: mutate
    }
}
