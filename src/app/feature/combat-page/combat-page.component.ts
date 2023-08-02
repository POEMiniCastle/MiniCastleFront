import { Component } from '@angular/core';
import { Player } from 'src/app/core/entities/Player';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { Trap } from 'src/app/core/entities/trap';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-combat-page',
  templateUrl: './combat-page.component.html',
  styleUrls: ['./combat-page.component.scss'],
})
export class CombatPageComponent {
  cardHolder!: Card;
  flip: string = 'active';
  overBlurVar!: string;
  visibilityVictoryVar!: string;
  visibilityDefeatVar!: string;
  result!: string;

  player!: Player;
  playerDamage!: number;
  playerHealth!: number;
  playerArmor!: number;

  monster?: Monster;
  monsterDamage!: number;
  monsterHealth!: number;
  calculatedDamage: number = 0;

  trap!: Trap;
  trapSkillCheck!: number;
  trapDamage!: number;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.getInfoCard();
  }

  getInfoCard() {
    this.cardHolder = JSON.parse(sessionStorage.getItem('event') as string);

    if (this.cardHolder.card_type == 'Trap') {
      this.getTrapStats();
      this.getPlayerStats();
      this.skillCheck(this.trapSkillCheck);
    } else if (this.cardHolder.card_type == 'Monster') {
      this.getCombatantsStats();
    }
  }

  getTrapStats() {
    this.cardService.getTrapType(this.cardHolder.id).subscribe({
      next: (trap) => {
        this.trap = trap;
        this.trapDamage = this.trap.damage;
        this.trapSkillCheck = this.trap.skillcheck;
      },
    });
  }

  getPlayerStats() {
    this.player = JSON.parse(localStorage.getItem('player') as string);
    this.playerDamage = this.player.character!.base_damage;
    this.playerHealth = this.player.character!.base_hp;
    this.playerArmor = this.player.character!.base_armor;
  }
  getMonsterStats() {
    this.cardService.getMonsterType(this.cardHolder.id).subscribe({
      next: (monsters) => {
        this.monster = monsters;
        this.monsterDamage = this.monster.damage;
        this.monsterHealth = this.monster.hp;
      },
    });
  }
  getCombatantsStats() {
    this.getPlayerStats();
    this.getMonsterStats();
  }

  determinePlayerMove(action: string) {
    if (action == 'attack') {
      this.monsterHealth -= this.playerDamage;
      if (this.monsterHealth <= 0) {
        this.result = 'VICTORY';
        this.displayMatchResult('victory');
      } else {
        console.log('Monster remaining health : ' + this.monsterHealth);
        this.calculatedDamage = this.monsterDamage - Math.round(this.playerArmor * 0.1);
        if (this.calculatedDamage > 0) {
          this.playerHealth -= this.monsterDamage - Math.round(this.playerArmor * 0.1);
        }
        if (this.playerHealth <= 0) {
          this.result =
            'YOU HAVE BEEN SUNDERED BY A ' +
            this.cardHolder.card_name.toUpperCase();
          this.displayMatchResult('defeat');
        }
      }
      console.log('Player remaining health : ' + this.playerHealth);
    } else if (action == 'defend') {
      console.log('defense');
    } else {
      console.log('THE PRESSURE WAS TOO BIG, YOU CHOOSED TO LEAVE');
    }
  }

  skillCheck(skillCheck: number) {
    if (this.getRandom(0, 101) > skillCheck) {
      this.result = 'You managed to dodge' + this.cardHolder.card_name;
      this.displayMatchResult('victory');
    } else {
      this.playerHealth = -this.trapDamage;
      if (this.playerHealth > 0) {
        this.result =
          "You didn't manage to dodge " +
          this.cardHolder.card_name +
          'and took ' +
          this.trapDamage +
          'damage';
        this.displayMatchResult('victory');
      } else {
        this.result =
          "You didn't manage to dodge " +
          this.cardHolder.card_name +
          'and died to it';
        this.displayMatchResult('defeat');
      }
    }
  }

  getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  displayMatchResult(matchResult: string) {
    this.overBlurVar = 'blur(50px)';
    if (matchResult == 'victory') {
      this.player.character!.base_hp = this.playerHealth;
      localStorage.setItem('player', JSON.stringify(this.player));
      this.visibilityVictoryVar = 'visible';
    } else if (matchResult == 'defeat') {
      sessionStorage.clear();
      this.visibilityDefeatVar = 'visible';
    }
  }
}
