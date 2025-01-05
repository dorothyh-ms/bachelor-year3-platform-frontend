import axios from './axios';

export type chatbotRequestArgs = {
    question: string, 
    game: string
}

export async function getAnswerForQuestion(body: chatbotRequestArgs): Promise<string> {
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
    console.log("answer", answer.answer)
    return answer.answer
}
