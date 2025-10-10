import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAuction } from './franchise-auction';

describe('FranchiseAuction', () => {
  let component: FranchiseAuction;
  let fixture: ComponentFixture<FranchiseAuction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseAuction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseAuction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
