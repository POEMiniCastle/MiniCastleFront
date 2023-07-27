import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/entities/card';

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

dmg:number = 10;

toggleFlip() {
  this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
}

flip: string = 'active';
}
