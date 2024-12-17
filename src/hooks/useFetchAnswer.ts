import {getAnswerForQuestion} from "../services/chatbotService.ts"
import {useState} from "react";

const useFetchChatbotAnswer = (question, game) => {
    const [loading, setLoading] = useState(false);
    let [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const postRequest = async () => {
        setLoading(true);
        setError(null); // Reset any previous errors

        try {
            const answer = await getAnswerForQuestion(question, game );
            setResponse(answer);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    return { loading, response, error, postRequest };
};

export default useFetchChatbotAnswer;
