import { Component, Input  } from "@angular/core";
import { timer } from "rxjs";
import { Player } from "src/app/core/entities/Player";
import { Card } from "src/app/core/entities/card";
import { Monster } from "src/app/core/entities/monster";
import { Trap } from "src/app/core/entities/trap";
import { CardService } from "src/app/services/card/card.service";
import { ClassService } from "src/app/services/class/class.service";

@Component({
  selector: "app-combat-page",
  templateUrl: "./combat-page.component.html",
  styleUrls: ["./combat-page.component.scss"],
})
export class CombatPageComponent {
  
  combatLog: Array<string> = [];
  encounterFinished: boolean = false;

// #region AllVariables
  cardHolder!: Card;
  flip: string = "active";
  overBlurVar!: string;
  visibilityVictoryVar!: string;
  visibilityDefeatVar!: string;
  result!: string;
  opacityVar!:number;
  currentImageIndex:number = 0;

  player!: Player;
  username!: string;
  playerDamage!: number;
  playerHealth!: number;
  playerArmor!: number;
  playerXp!: number;
  playerLevel!: number;
  skillName!: string;
  spellLeft!: number;

  monster?: Monster;
  monsterDamage!: number;
  monsterHealth!: number;
  monsterXp!: number;
  calculatedDamage: number = 0;

  trap!: Trap;
  trapSkillCheck!: number;
  trapDamage!: number;
// #endregion

  constructor(private cardService: CardService,private classService: ClassService) {}

  ngOnInit() {
    this.getInfoCard();   
  }

  // #region GettersInformations
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
    this.playerLevel = this.player.character!.level;
    this.playerXp = this.player.character!.xp;
    this.skillName = this.player.character!.skill_name;
  }

  getMonsterStats() {
    this.cardService.getMonsterType(this.cardHolder.id).subscribe({
      next: (monsters) => {
        this.monster = monsters;
        this.monsterDamage = this.monster.damage;
        this.monsterHealth = this.monster.hp;
        
        this.monsterXp = this.monster.xpReward;
        console.log(this.monsterXp)
      },
    });
  }

  getCombatantsStats() {
    this.getPlayerStats();
    this.getMonsterStats();
  }

  getRandom(min: number, max: number) {
    let res = Math.random() * (max - min) + min;
    return res;
  }
  // #endregion

  // #region Combat/Trap Logic
  determinePlayerMove(action: string) {
    if(this.combatLog.length>=9){
      this.combatLog = this.combatLog.slice(3,8);
    }
    if (action == "attack") {
     this.playerTurn(this.playerDamage); 
    } else if (action == "skill") {
      this.skill();
    } else if (action == "flee"){
      this.result = "NO PEACE FOR COWARDS"+" YOU DIED";
      this.displayMatchResult("defeat");
    }
  }

  playerTurn(damage:number){
    this.combatLog.push(this.username+" deals " +damage+" damage to "+this.cardHolder.card_name+".");
    this.monsterHealth -= damage;
    this.combatLog.push(this.cardHolder.card_name+" has "+this.monsterHealth+" health points left.");
    if (this.monsterHealth <= 0) {
      this.combatLog.push(this.cardHolder.card_name+" has died.");
      this.result = "VICTORY";
      this.displayMatchResult("victory");
    } else {
      this.monsterTurn();
    }
  }

  monsterTurn(){
    this.calculatedDamage = this.monsterDamage - Math.round(this.playerArmor * 0.1);
    if (this.calculatedDamage > 0) {
      this.combatLog.push(this.cardHolder.card_name+" deals "+this.calculatedDamage+" damage to "+this.username+".")
      this.playerHealth -= this.monsterDamage - Math.round(this.playerArmor * 0.1);
    }else if (this.calculatedDamage <= 0){
      this.combatLog.push(this.cardHolder.card_name+" try to hit "+this.username+" but he misses.")
    }
    if (this.playerHealth <= 0) {
      this.result = "YOU HAVE BEEN SUNDERED BY A "+this.cardHolder.card_name.toUpperCase();
      this.displayMatchResult("defeat");
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

  displayMatchResult(matchResult: string) {
    this.overBlurVar = 'blur(8px)';
    this.encounterFinished = true;
    if (matchResult == 'victory') {
      this.player.character!.base_hp = this.playerHealth;
      if( this.cardHolder.card_type == 'Monster'){
        this.player.character!.xp = this.playerXp+this.monsterXp;
        this.shouldPlayerLevelUp();
        this.player.character!.level = this.playerLevel;
      }
      localStorage.setItem('player', JSON.stringify(this.player));
      this.visibilityVictoryVar = 'visible';
      this.opacityVar=100;
      this.startAnimate('victory', 'play');

    } else if (matchResult == 'defeat') {
      sessionStorage.clear();
      this.visibilityDefeatVar = 'visible';
      this.opacityVar=100;
      this.startAnimate('defeat', 'play-menu');

    }
  }

  skill(){
    if(sessionStorage.getItem("spellLeft") == "0"){
      this.combatLog.push("You don't have any spell left.")
    }else if(this.player.character?.skill_name == 'Rage'){

      sessionStorage.setItem("spellLeft","0");
      let addedDamage = Math.round(this.getRandom(0,9));
      this.combatLog.push(this.username+" enters a state of absolute rage adding "+addedDamage+" to your attack.");
      this.playerDamage += addedDamage;
      this.monsterTurn();
    }else if(this.player.character?.skill_name == 'Fireball'){
      this.combatLog.push(this.username+" cast a fireball");
      sessionStorage.setItem("spellLeft","0");
      this.playerTurn(this.getRandom(2,(this.playerDamage*2)+1)+10);
    }else if(this.player.character?.skill_name == 'Precise shot'){
      sessionStorage.setItem("spellLeft","0");      
      this.combatLog.push(this.username+" focuses himselft to shoot precisely on "+ this.cardHolder.card_name);
      this.playerTurn(this.playerDamage*2);
    }
  }

  shouldPlayerLevelUp(){
    if(this.combatLog.length>=9){
    this.combatLog = this.combatLog.slice(3,8)
  }
    let xpCap = this.playerLevel*150;
    this.combatLog.push("You gained "+this.monsterXp);
    this.playerXp += this.monsterXp;
    this.combatLog.push("Current xp : "+this.playerXp+" / "+xpCap);
    if (this.playerXp >= xpCap){
      this.playerXp -= xpCap;
      this.playerLevel++;
      this.combatLog.push("You leveled up. You're now level"+this.playerLevel);
      this.classService.getClassData(this.player.character!.id).subscribe(classStats => this.playerHealth = classStats.base_hp);
    }
  }

  // #endregion

  // #region Animation
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
    const ending = document.getElementById(result) as HTMLImageElement | null;
    if(ending !=null){
      ending!.src = 'assets/'+ result+ '/' + this.getCurrentIndexImage(this.currentImageIndex) + '.webp';
      if(this.currentImageIndex < 24){
        this.currentImageIndex++;
      }else{
        this.currentImageIndex = 24;
      }
    }
  }

  startAnimate(result : string, route:string){
    this.animate(result);
    this.timerRedirect(route);
  }

  timerRedirect(route :string){
    const source = timer(3000);
    const subscribe = source.subscribe(res => window.location.href="/" + route);
  }

  // #endregion
}
