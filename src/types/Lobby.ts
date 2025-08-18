export type PlayerSlimDto = {
    playerId: string;
    username: string;
};

export type GameDto = {
    id: string;
    name: string;
    genre: string;
    difficultyLevel: string;
    price: number;
    description: string;
    image: string;
    url: string;
};

export type Lobby = {
    id: string;
    game: GameDto;

    // Either name depending on backend
    createdBy?: PlayerSlimDto;
    initiatingPlayer?: PlayerSlimDto;

    initiatingPlayerActive?: boolean;

    // Nullable when there is no second player
    joinedPlayer?: PlayerSlimDto | null;

    // Dates (support both names)
    createdDate?: string;
    dateCreated?: string;

    // Some payloads send "lobbyStatus", old ones "status"
    lobbyStatus?: string;
    status?: string;

    matchURL?: string | null;
};
