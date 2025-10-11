import { Component } from '@angular/core';
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
  selector: 'app-update-profile-admin',
  imports: [MatCardModule,
            CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule],
  templateUrl: './update-profile-admin.html',
  styleUrl: './update-profile-admin.css'
})
export class UpdateProfileAdmin {
    profileForm: FormGroup;

    constructor(private fb: FormBuilder,  private profileService:ProfileService,
    private router: Router){
      this.profileForm = this.fb.group({
      userName: [{ value: '', disabled: true }, Validators.required,],
      email: ['', Validators.required],
      userId:[''],
      password:[''],
      status: []

    });


    // Step 2: Fetch existing profile and patch values
    this.profileService.getUserProfile().subscribe({
      next: (profile:any) => {
        this.profileForm.patchValue({
        userId:profile.userId,  
        userName:profile.userName,
        email:profile.email,
        password:profile.password
        
      });
      },
      error: (err:any) => console.error('Error fetching profile:', err)
    });
}

  // Step 3: On form submit
  onSubmit(): void {
    console.log("onSubmit()");
    if (this.profileForm.valid) {
      const userId=this.profileForm.get('userId')?.value;
      const email=this.profileForm.get('email')?.value;

      const user = {email}; //Body for @RequestBody
      console.log("userId: ",userId);
      console.log("email: ",user);
      this.profileService.updateUserProfile(userId,user).subscribe({
        next: (res) => {
          console.log('Profile updated successfully!');
           Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
          this.router.navigate(['/admin/profile']);
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
  onCancel(){
    this.router.navigate(['/admin/profile']);
  }

}
