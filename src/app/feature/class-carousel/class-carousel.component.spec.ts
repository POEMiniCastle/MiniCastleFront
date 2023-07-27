import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCarouselComponent } from './class-carousel.component';

describe('ClassCarouselComponent', () => {
  let component: ClassCarouselComponent;
  let fixture: ComponentFixture<ClassCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCarouselComponent]
    });
    fixture = TestBed.createComponent(ClassCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
