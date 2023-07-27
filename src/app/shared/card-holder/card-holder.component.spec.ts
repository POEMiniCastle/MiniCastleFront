import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHolderComponent } from './card-holder.component';

describe('CardHolderComponent', () => {
  let component: CardHolderComponent;
  let fixture: ComponentFixture<CardHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardHolderComponent]
    });
    fixture = TestBed.createComponent(CardHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
