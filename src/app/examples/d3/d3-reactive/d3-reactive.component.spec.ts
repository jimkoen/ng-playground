import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ReactiveComponent } from './d3-reactive.component';

describe('D3ReactiveComponent', () => {
  let component: D3ReactiveComponent;
  let fixture: ComponentFixture<D3ReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [D3ReactiveComponent]
    });
    fixture = TestBed.createComponent(D3ReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
