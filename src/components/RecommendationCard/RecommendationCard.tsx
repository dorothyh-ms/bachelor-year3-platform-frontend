import { GameRecommendation } from "../../types/GameRecommendation";
import { useFetchGame } from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";
interface RecommendationCardProps {
    recommendation: GameRecommendation
}

const RecommendationCard = (props: RecommendationCardProps) => {

    const { recommendation } = props;
    const { game } = useFetchGame(recommendation.id);
    console.log("game", game)
    if (!game) {
        return null;
    }
    return (
        <GameCard game={game} />
    )
}

export default RecommendationCard;