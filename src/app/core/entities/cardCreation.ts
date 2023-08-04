import { Card } from "./card";
import { Monster } from "./monster";

export interface cardCreation {
    // card_image_path: string;
    // card_name: string;
    // card_type: string;
    // description: string;
    // score_value: number;
    // damage: number;
    // hp: number;
    // xp_reward:number;
    card:Card,
    monster: Monster
}