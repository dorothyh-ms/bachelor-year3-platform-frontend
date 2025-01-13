import {useMutation} from "@tanstack/react-query";
import {createGamePublishRequest} from "../services/addGameToPlatformRequestService";

export function useAddGameToPlatformRequest(customOnSuccess?: () => void) {
    const {mutate, isPending, isError} = useMutation({
        mutationFn: createGamePublishRequest,
        onSuccess: () => {
            if (customOnSuccess) customOnSuccess();
        },
        onError: () => {
            console.error("Failed to submit game.");
        },
    });

    return {
        isLoading: isPending,
        isError,
        submitAddGameToPlatformRequest: mutate,
    };
}
