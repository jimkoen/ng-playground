import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDGridComponent } from './crudgrid.component';

describe('CRUDGridComponent', () => {
  let component: CRUDGridComponent;
  let fixture: ComponentFixture<CRUDGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CRUDGridComponent]
    });
    fixture = TestBed.createComponent(CRUDGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
