// src/utils/transformGameSubmission.ts
import GameSubmission from "../types/GameSubmission";
import {Game} from "../types/Game";

export function transformGameSubmission(submission: GameSubmission): Game {
    return {
        id: submission.id,
        name: submission.name,
        genre: submission.genre,
        difficulty: submission.difficultyLevel, // Map `difficultyLevel` to `difficulty`
        price: submission.price,
        description: submission.description,
        image: submission.image, // Use the image URL from the submission
    };
}
