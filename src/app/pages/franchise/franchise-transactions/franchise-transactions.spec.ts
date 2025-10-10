import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTransactions } from './franchise-transactions';

describe('FranchiseTransactions', () => {
  let component: FranchiseTransactions;
  let fixture: ComponentFixture<FranchiseTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseTransactions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
