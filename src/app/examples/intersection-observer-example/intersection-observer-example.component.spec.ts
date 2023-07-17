import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersectionObserverExampleComponent } from './intersection-observer-example.component';

describe('IntersectionObserverExampleComponent', () => {
  let component: IntersectionObserverExampleComponent;
  let fixture: ComponentFixture<IntersectionObserverExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IntersectionObserverExampleComponent]
    });
    fixture = TestBed.createComponent(IntersectionObserverExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
