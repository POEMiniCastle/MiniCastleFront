import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Card } from 'src/app/core/entities/card';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
//#region Variables
  cardTable: Card[] = [];
  isActiveMap:Map<number, boolean> = new Map();
  PositionMap:Map<number, number> = new Map();
  overBlurVar!:string;
  visibilityVar!:string;
  opacityVar!:string;
  cardTemp!: Card;
  currentImageIndex:number = 0;
  nbFloor! : number;
//#endregion  

  constructor(private cardService: CardService, private router:Router){ }

  ngOnInit():void {
    this.getCards();
    this.createPosition();
    this.initFloor();
    if(sessionStorage.getItem("event") != null){
      this.checkPosition();
    }
  }

//#region Map Logics
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
      this.cardTemp = JSON.parse(sessionStorage.getItem("event") as string);
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
    if(index == 8){
      this.nbFloor = JSON.parse(localStorage.getItem("floor") as string) + 1;
      localStorage.setItem("floor", JSON.stringify(this.nbFloor));
      
    }
  }
  
  getBlurry(){
    this.overBlurVar='blur(8px)';
    this.visibilityVar = 'visible';    
    this.opacityVar = '100';
    if(this.cardTemp.card_type ==='Monster'){
      this.startAnimate('combat');
    }else 
    {
      this.startAnimate('trap');
    }
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

  initFloor(){
    this.nbFloor = 1;
    if(localStorage.getItem("floor") === null)
      localStorage.setItem("floor", JSON.stringify(this.nbFloor));
    else 
      localStorage.getItem("floor");
  }
//#endregion

//#region Animation
  getCurrentIndexImage(value:number){
    if(value < 10){
      return 0;
    } else {
      return value;
    }
  }

  animate(result : string){
    requestAnimationFrame(()=> {
      setTimeout(() => {
        this.animate(result);
      }, 1000/25);
      
    })
    const combat = document.getElementById(result) as HTMLImageElement | null;
    if(combat !=null){
      combat!.src = 'assets/'+result + '/' + this.getCurrentIndexImage(this.currentImageIndex) + '.webp';
      if(this.currentImageIndex < 24){
        this.currentImageIndex++;
      }else{
        this.currentImageIndex = 24;
        this.timerRedirect('combat');
        
      }
    }
  }

  startAnimate(result:string){
    this.animate(result);
  }

  timerRedirect(route :string){
    const source = timer(2000);
    const subscribe = source.subscribe(res => window.location.href="/" + route);
  }

  //#endregion
}

