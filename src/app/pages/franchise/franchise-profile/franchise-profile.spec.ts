import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseProfile } from './franchise-profile';

describe('FranchiseProfile', () => {
  let component: FranchiseProfile;
  let fixture: ComponentFixture<FranchiseProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
