import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [MatCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  updateProfile() {
    // open dialog or navigate to update form
    console.log('Update profile clicked');
  }
}
