import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldClickerGameComponent } from './old-clicker-game.component';

describe('ClickerGameComponent', () => {
  let component: OldClickerGameComponent;
  let fixture: ComponentFixture<OldClickerGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OldClickerGameComponent]
    });
    fixture = TestBed.createComponent(OldClickerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
