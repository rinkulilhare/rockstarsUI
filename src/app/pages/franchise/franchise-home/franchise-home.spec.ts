import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseHome } from './franchise-home';

describe('FranchiseHome', () => {
  let component: FranchiseHome;
  let fixture: ComponentFixture<FranchiseHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
