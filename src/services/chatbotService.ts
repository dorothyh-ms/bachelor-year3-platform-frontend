import axios from './axios';

export async function getAnswerForQuestion(question, game) {

    const questionDTO = {
        question,
        game
    };
        const {data: answer} = await axios.post(
            "/chatbot/question",
            questionDTO, // Send the questionDTO as the body
            {
                headers: {
                    'Content-Type': 'application/json', // Specify JSON payload
                    'Accept': 'application/json',
                },
            }
        )
        return answer
}
