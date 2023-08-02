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
  
  cardTable: Card[] = [];
  isActiveMap:Map<number, boolean> = new Map();
  PositionMap:Map<number, number> = new Map();
  overBlurVar!:string;
  visibilityVar!:string;
  cardTemp!: Card;

  constructor(private cardService: CardService){ }

  ngOnInit():void {
    this.getCards();
    this.createPosition();
    if(sessionStorage.getItem("event") != null){
      this.checkPosition();
    }
  }

  getCards(){
    this.cardService.getCard()
      .subscribe(cards => {
          this.cardTable = cards;
          for(let i=0; i<= this.cardTable.length; i++){
            this.isActiveMap.set(i, true);
          }
          this.isActiveMap.set(0, false);
      })
  } 

  changeState(event:boolean, index:number, blur:number){
    this.isActiveMap.set(index, event)
    sessionStorage.setItem("event", JSON.stringify(this.cardTable[index]));
    this.changeStateAfterChoose(index);
    if(blur!=0){
      this.getBlurry();
    }
  }

  changeStateAfterChoose(index:number){
    for(let i = 0; i<= this.cardTable.length; i++){
      this.isActiveMap.set(i, true);
    }
    if(index == 2 || index === 5){
      this.isActiveMap.set(index+3, false); 
    } else {
      this.isActiveMap.set(index+1, false);
      this.isActiveMap.set(index+3, false); 
    }
  }
  
  getBlurry(){
    this.overBlurVar='blur(8px)';
    this.visibilityVar = 'visible';
  }

  createPosition(){
    for(let i=0; i < this.cardTable.length; i++){
      this.PositionMap.set(i, this.cardTable[i].localID);
    }
  }

  checkPosition(){
    if(sessionStorage.getItem("event") != null){
      this.cardTemp = JSON.parse(sessionStorage.getItem("event") as string);
        for(let i =0; i <= this.PositionMap.size; i++){
          if(this.PositionMap.get(i) == this.cardTemp.localID) 
            this.changeState(false, i,0);
          }
    } else {
      return;
  }
  }
}

