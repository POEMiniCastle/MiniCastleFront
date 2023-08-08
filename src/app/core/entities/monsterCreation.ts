import { Card } from "./card";
import { Monster } from "./monster";


export class monsterCreation {
    card:Card;
    monster: Monster

    constructor(card:Card, monster:Monster){
        this.card = card;
        this.monster = monster;
    }

}