import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapCardComponent } from './trap-card.component';

describe('TrapCardComponent', () => {
  let component: TrapCardComponent;
  let fixture: ComponentFixture<TrapCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrapCardComponent]
    });
    fixture = TestBed.createComponent(TrapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
