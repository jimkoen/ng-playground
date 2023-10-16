import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetIntervalExampleComponent } from './reset-interval-example.component';

describe('ResetIntervalExampleComponent', () => {
  let component: ResetIntervalExampleComponent;
  let fixture: ComponentFixture<ResetIntervalExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResetIntervalExampleComponent]
    });
    fixture = TestBed.createComponent(ResetIntervalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
