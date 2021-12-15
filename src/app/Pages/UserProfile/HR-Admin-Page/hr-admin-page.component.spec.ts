import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRAdminPageComponent } from './hr-admin-page.component';

describe('HRAdminPageComponent', () => {
  let component: HRAdminPageComponent;
  let fixture: ComponentFixture<HRAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRAdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
