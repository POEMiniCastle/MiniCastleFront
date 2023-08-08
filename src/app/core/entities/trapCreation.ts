import { Card } from "./card";
import { Trap } from "./trap";

export class trapCreation {
    card:Card;
    trap: Trap

    constructor(card:Card, trap:Trap){
        this.card = card;
        this.trap = trap;
    }

}