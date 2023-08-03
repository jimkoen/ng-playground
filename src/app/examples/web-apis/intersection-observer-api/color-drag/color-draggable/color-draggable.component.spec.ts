import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDraggableComponent } from './color-draggable.component';

describe('ColorDraggableComponent', () => {
  let component: ColorDraggableComponent;
  let fixture: ComponentFixture<ColorDraggableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColorDraggableComponent]
    });
    fixture = TestBed.createComponent(ColorDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
