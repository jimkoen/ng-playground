import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDragComponent } from './color-drag.component';

describe('ColorDragComponent', () => {
  let component: ColorDragComponent;
  let fixture: ComponentFixture<ColorDragComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColorDragComponent]
    });
    fixture = TestBed.createComponent(ColorDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
