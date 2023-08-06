export class Card {
    id: number = 0;
    localID: number = 0;
    card_image_path: string;
    card_name: string;
    card_type: string;
    description: string;
    score_value: number;

    constructor(card_image_path: string, card_name: string,card_type: string,description: string,score_value: number){
        this.card_image_path = card_image_path;
        this.card_name =card_name;
        this.card_type = card_type;
        this.description = description;
        this.score_value = score_value;
    }
}