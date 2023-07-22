import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollContentLoadComponent } from './scroll-content-load.component';

describe('ScrollContentLoadComponent', () => {
  let component: ScrollContentLoadComponent;
  let fixture: ComponentFixture<ScrollContentLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScrollContentLoadComponent]
    });
    fixture = TestBed.createComponent(ScrollContentLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
