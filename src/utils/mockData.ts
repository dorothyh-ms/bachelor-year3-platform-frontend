// src/Utils/mockData.ts

export const mockFriends = [
    { id: 1, name: 'Ruth', status: 'online', gamesPlayed: 25, wins: 10 },
    { id: 2, name: 'Dora', status: 'offline', gamesPlayed: 40, wins: 20 },
    { id: 3, name: 'Noura', status: 'online', gamesPlayed: 15, wins: 5 },
    { id: 4, name: 'Emre', status: 'online', gamesPlayed: 30, wins: 15 },
];

// src/utils/mockData.ts

export const mockLobby = {
    id: 1,
    name: "BattleShip Lobby #001",
    players: [
        { id: 1, name: "Ruth", status: "Ready", gamesPlayed: 25, wins: 10 },
        { id: 2, name: "Dora", status: "Waiting", gamesPlayed: 40, wins: 20 },
        { id: 3, name: "Noura", status: "Waiting", gamesPlayed: 30, wins: 15 },
    ],
    host: "Ruth",
};

export const mockInvitations = [
    { id: 1, inviter: 'Player1', game: 'Battleship', date: '2024-11-20', status: 'Pending' },
    { id: 2, inviter: 'Player2', game: 'Chess', date: '2024-11-19', status: 'Pending' },
    { id: 3, inviter: 'Player3', game: 'Checkers', date: '2024-11-18', status: 'Accepted' },
];



