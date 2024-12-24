import React from "react";
import { useFavorites } from "../../hooks/useFavorites";
import GameCard from "./GameCard";

interface FavoritesListProps {
    playerId: string;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ playerId }) => {
    const { data: favorites, isLoading, isError } = useFavorites(playerId);

    if (isLoading) return <div>Loading favorites...</div>;
    if (isError) return <div>Failed to load favorites.</div>;

    return (
        <div>
            {favorites.map((game) => (
                <GameCard key={game.id} game={game} playerId={playerId} isFavorite={true} />
            ))}
        </div>
    );
};

export default FavoritesList;
