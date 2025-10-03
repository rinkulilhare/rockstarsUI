import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseDashboard } from './franchise-dashboard';

describe('FranchiseDashboard', () => {
  let component: FranchiseDashboard;
  let fixture: ComponentFixture<FranchiseDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
