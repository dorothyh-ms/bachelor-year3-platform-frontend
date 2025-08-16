// src/types/Lobby.ts
export type PlayerSlimDto = {
    playerId: string;
    username: string;
};

export type GameDto = {
    id: string;
    name: string;              // your frontend uses game.name
    genre: string;
    difficultyLevel: string;
    price: number;
    description: string;
    image: string;
    url: string;
};

export type Lobby = {
    id: string;

    // Game
    game: GameDto;

    // Creator / initiating player (support both names so either API payload works)
    createdBy?: PlayerSlimDto;
    initiatingPlayer?: PlayerSlimDto;

    // Optional second player
    joinedPlayer?: PlayerSlimDto | null;

    // Dates (support both names)
    createdDate?: string;
    dateCreated?: string;

    status?: string;

    // When a match URL is available
    matchURL?: string | null;
};
