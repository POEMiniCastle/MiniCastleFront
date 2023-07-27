import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Observable, concatMap, delay, filter, map } from 'rxjs';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardComponent {
  cards$: Observable<Card[]> | any;

  flip: string = 'active';

  cardMonster: Card[] = [];
  card: Card = {
    id: 0,
    card_image_path: '',
    card_name: '',
    card_type: '',
    description: '',
    score_value: 0
  };

  hp:number = 18;
  dmg:number = 50;

  constructor(private cardService: CardService){ }

  ngOnInit(): void {
    //this.cards$ = this.cardService.getCard();
    //this.peupleTaBDD(this.cards$);

    this.cardService.getCard()
    .pipe(
      concatMap(cardMonster => cardMonster),
      filter(card => card.card_type == "Monster")
      )
      .subscribe((res) => {
        console.log(res);
      })
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
  }

//   peupleTaBDD(observable: Observable<Card[]>){
//     observable.forEach((data:any) => {
//       this.card = {
//         id: data.id,
//         card_image_path: data.card_image_path,
//         card_name: data.card_name,
//         card_type: data.card_type,
//         description: data.description,
//         score_value: data.score_value 
//       };
//       console.log("Avant " + this.cardMonster); 
//       this.cardMonster?.push(this.card);  
//       console.log("Après " +this.cardMonster); 
//     });
//     console.log(this.cardMonster);  
// }
}
