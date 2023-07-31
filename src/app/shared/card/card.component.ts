import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Type, ViewChild } from '@angular/core';
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
  @Input() monsterCard! : Monster;

  flip: string = 'active';

  

  ngOnInit():void{
      this.loadComponent();    
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
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
  }


  
}
