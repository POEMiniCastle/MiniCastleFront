import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/core/entities/card';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.scss'],
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

export class MonsterCardComponent {
  @Input() card?: Card;

  hp:number = 18;
  dmg:number = 50;

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive'
  }

  flip: string = 'active';
}
