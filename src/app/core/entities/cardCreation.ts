import { Card } from "./card";
import { Monster } from "./monster";

export class cardCreation {
    card:Card;
    monster: Monster

    constructor(card:Card, monster:Monster){
        this.card = card;
        this.monster = monster;
    }
}