import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseEvents } from './franchise-events';

describe('FranchiseEvents', () => {
  let component: FranchiseEvents;
  let fixture: ComponentFixture<FranchiseEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
