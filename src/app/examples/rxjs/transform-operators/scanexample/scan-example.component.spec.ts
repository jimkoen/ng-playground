import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanExampleComponent } from './scan-example.component';

describe('ScanexampleComponent', () => {
  let component: ScanExampleComponent;
  let fixture: ComponentFixture<ScanExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScanExampleComponent]
    });
    fixture = TestBed.createComponent(ScanExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
