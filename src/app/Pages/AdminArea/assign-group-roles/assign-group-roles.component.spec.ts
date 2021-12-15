import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGroupRolesComponent } from './assign-group-roles.component';

describe('AssignGroupRolesComponent', () => {
  let component: AssignGroupRolesComponent;
  let fixture: ComponentFixture<AssignGroupRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignGroupRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGroupRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
