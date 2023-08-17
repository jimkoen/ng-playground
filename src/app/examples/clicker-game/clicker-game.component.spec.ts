import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickerGameComponent } from './clicker-game.component';

describe('ClickerGameComponent', () => {
  let component: ClickerGameComponent;
  let fixture: ComponentFixture<ClickerGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickerGameComponent]
    });
    fixture = TestBed.createComponent(ClickerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
