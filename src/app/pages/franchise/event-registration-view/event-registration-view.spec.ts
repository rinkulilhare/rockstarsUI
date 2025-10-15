import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationView } from './event-registration-view';

describe('EventRegistrationView', () => {
  let component: EventRegistrationView;
  let fixture: ComponentFixture<EventRegistrationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegistrationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRegistrationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
