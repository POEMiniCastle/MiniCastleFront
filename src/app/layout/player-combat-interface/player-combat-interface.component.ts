import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-combat-interface',
  templateUrl: './player-combat-interface.component.html',
  styleUrls: ['./player-combat-interface.component.scss']
})
export class PlayerCombatInterfaceComponent {

  @Output() clicked = new EventEmitter<string>; 

  attack(){
    this.clicked.emit("attack");
  }
  defend(){
    this.clicked.emit("skill");
  }
  flee(){
    this.clicked.emit("flee");
  }
}
