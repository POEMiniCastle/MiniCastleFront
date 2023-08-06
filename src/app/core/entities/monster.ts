import { Card } from "./card";

export class Monster {
    id: number = 0;
    damage: number;
    hp: number;
    xpReward:number;
    card! : Card;

    constructor(damage:number, hp:number, xpReward:number){
        this.damage = damage;
        this.hp = hp;
        this.xpReward = xpReward;
    }
}