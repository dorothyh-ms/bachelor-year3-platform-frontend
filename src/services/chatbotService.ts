import axios from './axios';

export type chatbotRequestArgs = {
    question: string, 
    game: string
}

export async function getAnswerForQuestion(body: chatbotRequestArgs): Promise<String> {
    const { data: answer } = await axios.post(
        "/chatbot/question",
        body, 
        {
            headers: {
                'Content-Type': 'application/json', // Specify JSON payload
                'Accept': 'application/json',
            },
        }
    )
    return answer
}
