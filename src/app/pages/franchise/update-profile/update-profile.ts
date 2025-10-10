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
export class UpdateProfileFR {
 
  profileForm: FormGroup;

  
   constructor(private fb: FormBuilder,  private profileService:ProfileService,
    private router: Router) {

      this.profileForm = this.fb.group({
      team_name: ['', Validators.required],
      owner_name: ['', Validators.required],
      incorporation_date: ['', Validators.required],
      dob: ['', Validators.required],
      status: []

     
    }); //formGP

  

  // Step 2: Fetch existing profile and patch values
    this.profileService.getFranchiseProfile().subscribe({
      next: (profile:any) => {
        this.profileForm.patchValue({
        team_name:profile.team_name,
        owner_name:profile.owner_name,
        incorporation_date:profile.incorporation_date,
        dob:profile.dob,
      });
      },
      error: (err:any) => console.error('Error fetching profile:', err)
    });
  }

  // Step 3: On form submit
  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.updateFranchiseProfile(this.profileForm.value).subscribe({
        next: (res) => {
          console.log('Profile updated successfully!');
           Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
          this.router.navigate(['/franchise/franchise-profile']);
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
    this.router.navigate(['/franchise/franchise-profile']);
  }

 } // class Profile Close


