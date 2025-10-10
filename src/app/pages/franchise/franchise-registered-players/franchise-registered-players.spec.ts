import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseRegisteredPlayers } from './franchise-registered-players';

describe('FranchiseRegisteredPlayers', () => {
  let component: FranchiseRegisteredPlayers;
  let fixture: ComponentFixture<FranchiseRegisteredPlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseRegisteredPlayers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseRegisteredPlayers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
