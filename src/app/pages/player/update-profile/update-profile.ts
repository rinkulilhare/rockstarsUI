import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile-service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  imports: [MatCardModule,
            CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule
            
  ],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile {
 
  profileForm: FormGroup;

   // Dropdown options
  playerRoles: string[] = [
    'Batter',
    'Bowler',
    'Wicket-Keeper',
    'Wicket-Keeper-Batter',
    'Wicket-Keeper-Bowler',
    'All-Rounder'
  ];

  playingStyles: string[] = [
    'Batting: Right-Handed (AND/OR) Bowling: Right-Handed',
    'Batting: Right-Handed (AND/OR) Bowling: Left-Handed',
    'Batting: Left-Handed (AND/OR) Bowling: Right-Handed',
    'Batting: Left-Handed (AND/OR) Bowling: Left-Handed'
  ];



   constructor(private fb: FormBuilder,  private profileService:ProfileService,
    private router: Router) {

      this.profileForm = this.fb.group({
      player_name: ['', Validators.required],
      player_role: ['', Validators.required],
      playing_style: ['', Validators.required],
      dob: ['', Validators.required],
      specialization: ['', Validators.required],          
      jersery_no: [''],
      status: []

     
    }); //formGP

  

  // Step 2: Fetch existing profile and patch values
    this.profileService.getPlayerProfile().subscribe({
      next: (profile:any) => {
        this.profileForm.patchValue({
        player_name:profile.player_name,
        player_role:profile.player_role,
        playing_style:profile.playing_style,
        specialization:profile.specialization,
        dob:profile.dob,
        jersery_no:profile.jersery_no
      });
      },
      error: (err:any) => console.error('Error fetching profile:', err)
    });
  }

  // Step 3: On form submit
  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.updatePlayerProfile(this.profileForm.value).subscribe({
        next: (res) => {
          console.log('Profile updated successfully!');
           Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
          this.router.navigate(['/player/player-profile']);
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          Swal.fire({
      title: 'Error!',
      text: 'Error While Updating Profile.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
        }
      }); 
    }
  }

   onCancel(): void {
    this.router.navigate(['/player/player-profile']);
  }

 } // class Profile Close


