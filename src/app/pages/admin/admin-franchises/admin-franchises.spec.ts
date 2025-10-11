import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFranchises } from './admin-franchises';

describe('AdminFranchises', () => {
  let component: AdminFranchises;
  let fixture: ComponentFixture<AdminFranchises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFranchises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFranchises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
