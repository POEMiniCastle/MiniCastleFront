import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from 'src/app/core/entities/card';
import { monsterCreation } from 'src/app/core/entities/monsterCreation';
import { Monster } from 'src/app/core/entities/monster';
import { Trap } from 'src/app/core/entities/trap';
import { InsertCardService } from 'src/app/services/insertCard/insert-card.service';
import { trapCreation } from 'src/app/core/entities/trapCreation';


@Component({
  selector: 'app-creation-card',
  templateUrl: './creation-card.component.html',
  styleUrls: ['./creation-card.component.scss']
})

export class CreationCardComponent {
  cardForm:FormGroup;
  cardType:string = "";
  cardName:string = "";
  damage:number = 0;
  hp:number = 0;
  skillCheck:number = 0;
  xpReward:number = 0;
  cardDescription:string = "";
  cardImagePath:string = "";
  
  constructor(private fb:FormBuilder, private insertServices:InsertCardService){
    this.cardForm = this.fb.group({
      cardType:'',
      cardName:'',
      damage:'',
      hp:'',
      skillCheck:'',
      xpReward:'',
      cardDescription:'',
      cardImagePath:''
    })
  }

  summoner(){
    this.setValue();
    if(this.cardType === 'Monster'){
      this.insertServices.insertMonster(this.instanciateMonsterCard())
      .subscribe({
        next: (response: monsterCreation) => {
          alert(response.card.card_name + " has been invoked !");
          this.cardForm.reset();
        },
        error: (err) => console.error(err)
      })
    } else if (this.cardType === 'Trap'){
      this.insertServices.insertTrap(this.instanciateTrapCard())
      .subscribe({
        next: (response: trapCreation) => {
          alert(response.card.card_name + " has been invoked !");
          this.cardForm.reset();
        },
        error: (err) => console.error(err)
      })
    } else{
      console.error("Bad input");
    }
  }

  setValue(){
    this.cardType = this.cardForm.value.cardType;
    this.cardName = this.cardForm.value.cardName;
    this.damage = this.cardForm.value.damage;
    this.hp = this.cardForm.value.hp;
    this.skillCheck = this.cardForm.value.skillCheck;
    this.xpReward = this.cardForm.value.xpReward;
    this.cardDescription = this.cardForm.value.cardDescription;
    this.cardImagePath = this.cardForm.value.cardImagePath;
  }

  instanciateMonsterCard(){
    return new monsterCreation(new Card(this.cardImagePath, this.cardName, this.cardType, this.cardDescription, this.skillCheck), new Monster(this.damage, this.hp, this.xpReward));
  }

  instanciateTrapCard(){
    return new trapCreation(new Card(this.cardImagePath, this.cardName, this.cardType, this.cardDescription, this.skillCheck), new Trap(this.damage, this.skillCheck));
  }
}