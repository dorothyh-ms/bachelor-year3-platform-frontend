import { PlayerAchievement } from '../types/Achievement';
import api from './axios';


export async function getAchievements() : Promise<PlayerAchievement[]> {
    const {data : achievements} = await api.get<PlayerAchievement[]>(`/achievements`)
    return achievements;
}