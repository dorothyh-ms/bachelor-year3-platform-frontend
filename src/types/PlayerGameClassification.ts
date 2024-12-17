export type PlayerGameClassification = {
    playerId: string; // UUID is typically represented as a string in TypeScript
    gameId: string;
    gameName: string;
    totalWins: number;
    totalLosses: number;
    classification: string;
  }

