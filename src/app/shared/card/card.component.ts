import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, Type, ViewChild } from '@angular/core';
import { AdDirective } from 'src/app/ad.directive';
import { Card } from 'src/app/core/entities/card';
import { MonsterCardComponent } from './monster-card/monster-card.component';
import { TreasureCardComponent } from './treasure-card/treasure-card.component';
import { TrapCardComponent } from './trap-card/trap-card.component';
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
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  @Input() card!: Card;
  @Input() deActivate : boolean | undefined;

  @Output() flipped = new EventEmitter<boolean>();
  
  flip: string = 'active';
  temp!:string;
  
  ngOnInit():void{
      this.loadComponent();  
      this.checkingTheMap();
  }

  loadComponent(){
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.getContentType());
    componentRef.instance.card = this.card;
  }

  getContentType():Type<any>{
    switch (this.card?.card_type) {
      case "Monster":
        return MonsterCardComponent;
      break;
    case "Treasure":
        return TreasureCardComponent;
      break;
    case "Trap":
        return TrapCardComponent;
      break;
    default:
      return TrapCardComponent;
    }  
  }
  
  toggleFlip() {
    if(this.deActivate){
      return;
    } else {
      this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
      this.flipped.emit(true);
      this.desactivateFlip();
    }
  }

  desactivateFlip(){
    this.deActivate = true;
    this.addToTheMap();
  }
  
  addToTheMap(){
    if(sessionStorage.getItem(this.card.card_name + this.card.localID) !== null){
        this.flip = 'inactive';
        this.deActivate = true;
        sessionStorage.setItem(this.card.card_name + this.card.localID, (this.flip));
    } else {
      sessionStorage.setItem(this.card.card_name + this.card.localID, (this.flip));
    }
  }

  checkingTheMap(){
    if(sessionStorage.getItem(this.card.card_name + this.card.localID) !== null){
      this.flip = 'inactive';
      this.deActivate = true;
      sessionStorage.setItem(this.card.card_name + this.card.localID, (this.flip));
    }
  }
}
