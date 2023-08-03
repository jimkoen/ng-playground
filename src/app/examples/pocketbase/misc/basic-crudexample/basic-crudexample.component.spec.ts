import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCRUDExampleComponent } from './basic-crudexample.component';

describe('BasicCRUDExampleComponent', () => {
  let component: BasicCRUDExampleComponent;
  let fixture: ComponentFixture<BasicCRUDExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasicCRUDExampleComponent]
    });
    fixture = TestBed.createComponent(BasicCRUDExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
