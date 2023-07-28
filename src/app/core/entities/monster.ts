import { Card } from "./card";

export interface Monster {
    id: number;
    damage: number;
    hp: number;
    xp_reward:number;
    card : Card;
}