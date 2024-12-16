import React from "react";
import { Button, Card, CardMedia, CardContent, Typography, Chip } from "@mui/material";
import { Game } from "../../types/Game";
import defaultGameImage from '../../assets/images/banditgames-mascot.png';

interface GameCardProps {
    game: Game;
    isFavorite: boolean;
    onAddFavorite: (game: Game) => void;
    onRemoveFavorite: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onAddFavorite, onRemoveFavorite }) => (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="194"
            image={game.image || defaultGameImage}
            alt={game.name}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {game.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {game.description}
            </Typography>
            <Chip label={game.genre.toLowerCase()} sx={{ width: "fit-content" }} />
            {isFavorite ? (
                <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{ marginTop: 1 }}
                    onClick={() => onRemoveFavorite(game)}
                >
                    Remove from Favorites
                </Button>
            ) : (
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{ marginTop: 1 }}
                    onClick={() => onAddFavorite(game)}
                >
                    Add to Favorites
                </Button>
            )}
        </CardContent>
    </Card>
);

export default GameCard;
