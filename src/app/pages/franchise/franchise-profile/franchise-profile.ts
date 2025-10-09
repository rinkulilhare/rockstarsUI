import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-franchise-profile',
  imports: [MatCard, MatCardModule, CommonModule],
  templateUrl: './franchise-profile.html',
  styleUrl: './franchise-profile.css'
})
export class FranchiseProfile {
 constructor(){}

     status: boolean=false;  // ✅ add this line

  updateProfile() {
    // open dialog or navigate to update form
    console.log('Update profile clicked');
  }
}
