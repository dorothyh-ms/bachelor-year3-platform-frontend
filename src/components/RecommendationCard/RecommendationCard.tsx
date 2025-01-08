import {GameRecommendation} from "../../types/GameRecommendation";
import {useFetchGames} from "../../hooks/useGames";
import GameCard from "../GameCard/GameCard";

interface RecommendationCardProps {
    recommendation: GameRecommendation;
}

const RecommendationCard = (props: RecommendationCardProps) => {
    const {recommendation} = props;
    const {data: games} = useFetchGames();


    const game = games.find((g) => g.id === recommendation.id);

    if (!game) {
        return null;
    }

    return <GameCard game={game}/>;
};

export default RecommendationCard;
