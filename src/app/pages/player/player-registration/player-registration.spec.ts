import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRegistration } from './player-registration';

describe('PlayerRegistration', () => {
  let component: PlayerRegistration;
  let fixture: ComponentFixture<PlayerRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
