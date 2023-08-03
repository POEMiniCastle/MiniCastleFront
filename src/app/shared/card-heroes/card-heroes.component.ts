import { Component, Input, SimpleChanges } from '@angular/core';
import { Character } from 'src/app/core/entities/Character';
import { Player } from 'src/app/core/entities/Player';

@Component({
  selector: 'card-heroes',
  templateUrl: './card-heroes.component.html',
  styleUrls: ['./card-heroes.component.scss']
})
export class CardHeroesComponent {
  heroes?:Character;
  @Input() heroesHealth!:number;
  @Input() heroesDamage!:number;
  playerTemp!:Player;


  ngOnInit():void {
    this.getInfoHeroes();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['heroesHealth']){
      
    }
  }

  getInfoHeroes(){
    this.playerTemp = JSON.parse(localStorage.getItem('player')as string);
    this.heroes = this.playerTemp.character;
  }
}
