import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySheetComponent } from './play-sheet.component';

describe('PlaySheetComponent', () => {
  let component: PlaySheetComponent;
  let fixture: ComponentFixture<PlaySheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaySheetComponent]
    });
    fixture = TestBed.createComponent(PlaySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
