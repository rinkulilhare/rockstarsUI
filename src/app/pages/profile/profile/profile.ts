import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatCardModule, CommonModule ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

     constructor(){}

     status: boolean=false;  // ✅ add this line

  updateProfile() {
    // open dialog or navigate to update form
    console.log('Update profile clicked');
  }

  resetProfile(){
    console.log('resetProfile');
  }
}
