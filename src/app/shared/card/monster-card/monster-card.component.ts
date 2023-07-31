import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.scss'],
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

export class MonsterCardComponent {
  @Input() card?: Card;
  monsterCard?:Monster;
  flip: string = 'active'; 
  constructor(private cardService: CardService){ }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
  }
 
  ngOnInit(){
    if(this.card){
      this.getMonsterInfo(this.card.id)
    }
  }

  getMonsterInfo(id:number){
    this.cardService.getMonsterType(id).subscribe(monster => this.monsterCard = monster);
  }
}
