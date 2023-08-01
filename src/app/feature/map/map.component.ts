import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, concatMap, findIndex, timer } from 'rxjs';
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
  isActiveMap:Map<number, boolean> = new Map();
  constructor(private cardService: CardService){ }

  ngOnInit() {
    this.getCards();
  }

  getCards():any{
    this.cardService.getCard()
      .subscribe(cards => {
        this.cardTable = cards;
        for(let i=0; i<= this.cardTable.length; i++){
          this.isActiveMap.set(i, true);
        }
        this.isActiveMap.set(0, false);
      })
  } 

  changeState(event:boolean, index:number){
    this.isActiveMap.set(index, event)
    this.changeStateAfterChoose(index);
  }

  changeStateAfterChoose(index:number){
    for(let i = 0; i<= this.cardTable.length; i++){
      this.isActiveMap.set(i, true);
    }
    if(index !== 3){
      this.isActiveMap.set(index+1, false);
      this.isActiveMap.set(index+3, false); 
    } else {
      this.isActiveMap.set(index+1, true);
      this.isActiveMap.set(index+3, false); 
    }

    
  }
  
}

