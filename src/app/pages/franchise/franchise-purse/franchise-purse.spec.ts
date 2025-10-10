import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePurse } from './franchise-purse';

describe('FranchisePurse', () => {
  let component: FranchisePurse;
  let fixture: ComponentFixture<FranchisePurse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchisePurse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchisePurse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
