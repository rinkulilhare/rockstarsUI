import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-registration',
  imports: [],
  templateUrl: './player-registration.html',
  styleUrl: './player-registration.css'
})
export class PlayerRegistration {
  eventId!: number;
  profileId!: number;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { eventId: number; profileId: number };

    if (state) {
      this.eventId = state.eventId;
      this.profileId = state.profileId;
      console.log('Event ID:', this.eventId);
      console.log('Profile ID:', this.profileId);
    } else {
      // optional fallback if page is reloaded
      console.warn('No navigation state found.');
    }
  }
}
