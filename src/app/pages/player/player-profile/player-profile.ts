import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-player-profile',
  imports: [MatCard, MatCardModule, CommonModule],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css'
})
export class PlayerProfile {

   constructor(){}

     status: boolean=false;  // ✅ add this line

  updateProfile() {
    // open dialog or navigate to update form
    console.log('Update profile clicked');
  }


}
