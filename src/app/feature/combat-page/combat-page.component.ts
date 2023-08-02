import { Component } from '@angular/core';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.scss']
})
export class CombatPageComponent {
  cardHolder!:Card;
  flip: string = 'active';
  monster?:Monster;

  constructor(private CardService : CardService){}
  ngOnInit(){
    this.getInfoCard();
  }
  
  getInfoCard(){
    this.cardHolder = JSON.parse(sessionStorage.getItem("event")as string)
  }
}
