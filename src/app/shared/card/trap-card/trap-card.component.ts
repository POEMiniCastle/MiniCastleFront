import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/entities/card';
import { Trap } from 'src/app/core/entities/trap';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-trap-card',
  templateUrl: './trap-card.component.html',
  styleUrls: ['./trap-card.component.scss'],
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
export class TrapCardComponent {
  @Input() card?: Card;
  trapCard?: Trap;
  flip: string = 'active';

  constructor(private cardService: CardService){ }

  ngOnInit(){
    if(this.card){
      this.getTrapInfo(this.card.id);
    }
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
  }

  getTrapInfo(id:number){
    this.cardService.getTrapType(id).subscribe(trap => this.trapCard = trap);
  }
}
