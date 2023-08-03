import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollWithComponentLifeCycleComponent } from './infinite-scroll-with-component-life-cycle.component';

describe('InfiniteScrollWithComponentLifeCycleComponent', () => {
  let component: InfiniteScrollWithComponentLifeCycleComponent;
  let fixture: ComponentFixture<InfiniteScrollWithComponentLifeCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollWithComponentLifeCycleComponent]
    });
    fixture = TestBed.createComponent(InfiniteScrollWithComponentLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
