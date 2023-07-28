import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatPageComponent } from './combat-page.component';

describe('CombatPageComponent', () => {
  let component: CombatPageComponent;
  let fixture: ComponentFixture<CombatPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombatPageComponent]
    });
    fixture = TestBed.createComponent(CombatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
