import { Card } from "./card";

export class Trap {
    id: number = 0;
    skillCheck: number;
    damage: number;

    constructor(damage:number, skillCheck:number){
        this.damage = damage;
        this.skillCheck = skillCheck;
    }
}