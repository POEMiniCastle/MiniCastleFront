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
  opacityVar!:string;
  cardTemp!: Card;
  currentImageIndex:number = 0;
  

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
          for(let i = 0; i <= this.cardTable.length; i++){
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
      this.disabledCard();
    }
  }

  changeStateAfterChoose(index:number){
    this.disabledCard();
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
    this.opacityVar = '100';    
    this.startAnimate();
  }

  createPosition(){
    for(let i=0; i < this.cardTable.length; i++){
      this.PositionMap.set(i, this.cardTable[i].localID);
    }
  }

  checkPosition(){
    if(sessionStorage.getItem("event") != null){
      this.cardTemp = JSON.parse(sessionStorage.getItem("event") as string);
        for(let i = 0; i <= this.PositionMap.size; i++){
          if(this.PositionMap.get(i) == this.cardTemp.localID){
            this.changeState(false, i,0);
          } else if (this.cardTemp.localID == 8){
            console.log("je suis là")
            sessionStorage.clear();
            this.getCards();
          } 
        }
      } else {
        return;
    }
  }

  disabledCard(){
    for(let i = 0; i<= this.cardTable.length; i++){
      this.isActiveMap.set(i, true);
    }
  }
  getCurrentIndexImage(value:number){
    if(value < 10){
      return 0;
    } else {
      return value;
    }
  }

  animate(){
    requestAnimationFrame(()=> {
      setTimeout(() => {
        this.animate();
      }, 1000/25);
      
    })
    const combat = document.getElementById('imageRender') as HTMLImageElement | null;
    if(combat !=null){
      combat!.src = 'assets/combat/'+ this.getCurrentIndexImage(this.currentImageIndex) + '.webp';
      if(this.currentImageIndex < 30){
        this.currentImageIndex++;
      }else{
        this.currentImageIndex = 30;
      }
    }
  }

  startAnimate(){
    this.animate()
  }

  redirect(){
    window.location.href="/combat";
  }
}


