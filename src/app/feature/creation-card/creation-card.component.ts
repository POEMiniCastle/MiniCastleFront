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
  card_Type:string = "";
  card_Name:string = "";
  damage:number = 0;
  hp:number = 0;
  skillCheck:number = 0;
  xp_Reward:number = 0;
  card_Description:string = "";
  card_ImagePath:string = "";
  
  cardTemp!:cardCreation;

  constructor(private fb:FormBuilder, private insertServices:InsertCardService){
    this.cardForm = this.fb.group({
      card_Type:'',
      card_Name:'',
      damage:'',
      hp:'',
      skillCheck:'',
      xp_Reward:'',
      card_Description:'',
      card_ImagePath:''
    })
  }

  summoner(){
    this.setValue();
    this.instanciateCard();
    this.insertServices.insert(this.cardTemp);
  }

  setValue(){
    this.card_Type = this.cardForm.get('card_Type')?.value;
    this.card_Name = this.cardForm.get('card_Name')?.value;
    this.damage = this.cardForm.get('damage')?.value;
    this.hp = this.cardForm.get('hp')?.value;
    this.skillCheck = this.cardForm.get('skillCheck')?.value;
    this.xp_Reward = this.cardForm.get('xp_Reward')?.value;
    this.card_Description = this.cardForm.get('card_Description')?.value;
    this.card_ImagePath = this.cardForm.get('card_ImagePath')?.value;
  }

  instanciateCard(){
    this.cardTemp.card.card_name = this.card_Name;
    this.cardTemp.card.description = this.card_Description;
    this.cardTemp.card.card_image_path = this.card_ImagePath;
    this.cardTemp.card.score_value = this.skillCheck;
    this.cardTemp.card.card_type = this.card_Type;
    this.cardTemp.monster.damage = this.damage;
    this.cardTemp.monster.hp = this.hp;
    this.cardTemp.monster.xp_reward = this.xp_Reward;
    return this.cardTemp;
  }
}