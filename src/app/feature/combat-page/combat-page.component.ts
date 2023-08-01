import { Component } from '@angular/core';
import { Card } from 'src/app/core/entities/card';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.scss']
})
export class CombatPageComponent {
  cardHolder!:Card;
  flip: string = 'active';

  ngOnInit(){
    this.getInfoCard();
  }

  getInfoCard(){
    this.cardHolder = JSON.parse(sessionStorage.getItem("event")as string)
  }
}
