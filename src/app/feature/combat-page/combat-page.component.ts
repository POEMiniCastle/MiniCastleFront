import { Component, Input  } from "@angular/core";
import { Player } from "src/app/core/entities/Player";
import { Card } from "src/app/core/entities/card";
import { Monster } from "src/app/core/entities/monster";
import { Trap } from "src/app/core/entities/trap";
import { CardService } from "src/app/services/card/card.service";

@Component({
  selector: "app-combat-page",
  templateUrl: "./combat-page.component.html",
  styleUrls: ["./combat-page.component.scss"],
})
export class CombatPageComponent {
  combatLog: Array<string> = [];

  cardHolder!: Card;
  flip: string = "active";
  overBlurVar!: string;
  visibilityVictoryVar!: string;
  visibilityDefeatVar!: string;
  result!: string;
  opacityVar!:number;

  player!: Player;
  username!: string;
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
    this.cardHolder = JSON.parse(sessionStorage.getItem("event") as string);

    if (this.cardHolder.card_type == "Trap") {
      this.getPlayerStats();
      this.getTrapStats();
    } else if (this.cardHolder.card_type == "Monster") {
      this.getCombatantsStats();
    }
  }

  getTrapStats() {
    this.cardService.getTrapType(this.cardHolder.id).subscribe({
      next: (traps) => {
          this.trap = traps;
        this.trapDamage = this.trap.damage;
        this.trapSkillCheck = this.trap.skillCheck;
        this.skillCheck(this.trapSkillCheck);

      },
  });        
    
  }

  getPlayerStats() {
    this.player = JSON.parse(localStorage.getItem("player") as string);
    this.username = this.player.username;
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
    if (action == "attack") {
      this.combatLog.push(this.username+" deals "+this.playerDamage+" damage to "+this.cardHolder.card_name+".")
      this.monsterHealth -= this.playerDamage;
      this.combatLog.push(this.cardHolder.card_name+" has "+this.monsterHealth+" health points left.")
      if (this.monsterHealth <= 0) {
        this.combatLog.push(this.cardHolder.card_name+" has died.");
        this.result = "VICTORY";
        this.displayMatchResult("victory");
      } else {
        this.calculatedDamage = this.monsterDamage - Math.round(this.playerArmor * 0.1);
        if (this.calculatedDamage > 0) {
          this.combatLog.push(this.cardHolder.card_name+" deals "+this.calculatedDamage+" damage to "+this.username+".")
          this.playerHealth -= this.monsterDamage - Math.round(this.playerArmor * 0.1);
        }else if (this.calculatedDamage <= 0){
          this.combatLog.push(this.cardHolder.card_name+" try to hit "+this.username+" but his armor is too strong (GIT GUD).")
        }
        if (this.playerHealth <= 0) {
          this.result = "YOU HAVE BEEN SUNDERED BY A "+this.cardHolder.card_name.toUpperCase()+" GIT GUD KIDDO";
          this.displayMatchResult("defeat");
        }
      }
      console.log("Player remaining health : " + this.playerHealth);
    } else if (action == "defend") {
      console.log("defense");
    } else {
      console.log("THE PRESSURE WAS TOO BIG, YOU CHOOSED TO LEAVE.");
    }
  }

  skillCheck(skillCheck: number) {
    let rand = this.getRandom(0, 101)
    if (rand > skillCheck) {
      this.result = "You managed to dodge " + this.cardHolder.card_name;
      this.displayMatchResult("victory");
    } else if (rand < skillCheck){
      this.playerHealth -= this.trapDamage;
      if (this.playerHealth > 0) {
        this.result ="You didn't manage to dodge " + this.cardHolder.card_name +" and took " + this.trapDamage + "damage";
        this.displayMatchResult("victory");
      } else if (this.playerHealth < 0){
        this.result ="You didn't manage to dodge " +this.cardHolder.card_name +" and died to it";
        this.displayMatchResult("defeat");
      }
    }
  }

  getRandom(min: number, max: number) {
    let res = Math.random() * (max - min) + min;
    return res;
  }

  displayMatchResult(matchResult: string) {
    this.overBlurVar = 'blur(8px)';
    if (matchResult == 'victory') {
      this.player.character!.base_hp = this.playerHealth;
      localStorage.setItem('player', JSON.stringify(this.player));
      this.visibilityVictoryVar = 'visible';
      this.opacityVar=100;
    } else if (matchResult == 'defeat') {
      sessionStorage.clear();
      this.visibilityDefeatVar = 'visible';
      this.opacityVar=100;
    }
  }
}
