import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-combat-interface',
  templateUrl: './player-combat-interface.component.html',
  styleUrls: ['./player-combat-interface.component.scss'],
})
export class PlayerCombatInterfaceComponent {
  @Output() clicked = new EventEmitter<string>();
  @Input() disabled: boolean = false;

  attack() {
    if (!this.disabled) {
      this.clicked.emit('attack');
    }
  }
  defend() {
    if (!this.disabled) {
      this.clicked.emit('skill');
    }
  }
  flee() {
    if (!this.disabled) {
      this.clicked.emit('flee');
    }
  }
}
