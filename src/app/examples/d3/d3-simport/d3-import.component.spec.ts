import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ImportComponent } from './d3-import.component';

describe('D3SImportComponent', () => {
  let component: D3ImportComponent;
  let fixture: ComponentFixture<D3ImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [D3ImportComponent]
    });
    fixture = TestBed.createComponent(D3ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
