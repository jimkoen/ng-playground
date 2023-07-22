import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryLoadComponent } from './geometry-load.component';

describe('GeometryLoadComponent', () => {
  let component: GeometryLoadComponent;
  let fixture: ComponentFixture<GeometryLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeometryLoadComponent]
    });
    fixture = TestBed.createComponent(GeometryLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
