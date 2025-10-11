import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileAdmin } from './update-profile-admin';

describe('UpdateProfileAdmin', () => {
  let component: UpdateProfileAdmin;
  let fixture: ComponentFixture<UpdateProfileAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfileAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
