export type PlayerEngagementPredictions = {
    username: string;
    game_id: string;
    predictions: EngagmentPrediction[];
};

export type EngagmentPrediction = {
    date: string; // Representing LocalDate as a string
    predictedMinutes: number;
};

