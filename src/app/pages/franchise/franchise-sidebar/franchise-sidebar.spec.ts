import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseSidebar } from './franchise-sidebar';

describe('FranchiseSidebar', () => {
  let component: FranchiseSidebar;
  let fixture: ComponentFixture<FranchiseSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
