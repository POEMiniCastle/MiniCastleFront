import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureCardComponent } from './treasure-card.component';

describe('TreasureCardComponent', () => {
  let component: TreasureCardComponent;
  let fixture: ComponentFixture<TreasureCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreasureCardComponent]
    });
    fixture = TestBed.createComponent(TreasureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
