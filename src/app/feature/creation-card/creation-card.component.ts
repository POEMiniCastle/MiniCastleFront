import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from 'src/app/core/entities/card';
import { cardCreation } from 'src/app/core/entities/cardCreation';
import { Monster } from 'src/app/core/entities/monster';
import { Trap } from 'src/app/core/entities/trap';
import { CardService } from 'src/app/services/card/card.service';
import { InsertCardService } from 'src/app/services/insertCard/insert-card.service';


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
    this.insertServices.insert(this.setValue())
    .subscribe({
      next: (response: cardCreation) => {
        console.log(response);
      },
      error: (err) => console.error(err)
    })
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
    return this.instanciateCard();
  }

  instanciateCard(){
    return new cardCreation(new Card(this.cardImagePath, this.cardName, this.cardType, this.cardDescription, this.skillCheck), new Monster(this.damage, this.hp, this.xpReward))
  }
}