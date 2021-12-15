import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormListComponent } from './employee-form-list.component';

describe('EmployeeFormListComponent', () => {
  let component: EmployeeFormListComponent;
  let fixture: ComponentFixture<EmployeeFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
