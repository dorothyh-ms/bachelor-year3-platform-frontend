
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, Chip } from "@mui/material"

import { Game } from "../../types/Game"
import defaultGameImage from '../../assets/images/banditgames-mascot.png'


interface GameCardProps {
    game: Game
}
const GameCard = (props: GameCardProps) => {
    const {game} = props;
    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="194"
      image={game.image ? game.image : defaultGameImage}
      alt={game.name}
    />
    <CardContent sx={{display: "flex", flexDirection: "column", gap: 1}}>
    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {game.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {game.description}
      </Typography>
      <Chip label={game.genre.toLocaleLowerCase()} sx={{width: "fit-content"}} />
    </CardContent>
   
    
  </Card>)
}

export default GameCard;