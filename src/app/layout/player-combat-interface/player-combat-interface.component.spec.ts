import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCombatInterfaceComponent } from './player-combat-interface.component';

describe('PlayerCombatInterfaceComponent', () => {
  let component: PlayerCombatInterfaceComponent;
  let fixture: ComponentFixture<PlayerCombatInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCombatInterfaceComponent]
    });
    fixture = TestBed.createComponent(PlayerCombatInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
