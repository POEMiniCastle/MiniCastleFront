import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import { AdDirective } from 'src/app/ad.directive';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { CardComponent } from 'src/app/shared/card/card.component';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
  
  cardTable!: Card[];
  monsterTable! : Monster[];
  temp!:Monster;

  constructor(private cardService: CardService){ }

  ngOnInit() {
    this.getCards();
    this.getCards().forEach(element => {
      this.temp = this.cardService.getMonsterType(element.id);
      this.monsterTable.push(this.temp);
      
    });
  }

  getCards():any{
    this.cardService.getCard()
      .subscribe(cards => this.cardTable = cards)
  } 
}

