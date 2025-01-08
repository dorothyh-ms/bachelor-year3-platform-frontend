import { Match } from '../types/Match';
import api from './axios';


export async function getMatches() : Promise<Match[]> {
    const {data : matches} = await api.get<Match[]>(`/matches`)
    return matches;
}