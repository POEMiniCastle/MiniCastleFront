import { Component, Input, Type, ViewChild } from '@angular/core';
import { AdDirective } from 'src/app/ad.directive';
import { Card } from 'src/app/core/entities/card';
import { MonsterCardComponent } from '../card/monster-card/monster-card.component';
import { TrapCardComponent } from '../card/trap-card/trap-card.component';
import { TreasureCardComponent } from '../card/treasure-card/treasure-card.component';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss']
})
export class CardHolderComponent {
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  @Input() card!: Card;

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
}