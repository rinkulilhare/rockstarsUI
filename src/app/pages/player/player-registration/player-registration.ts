import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2'
import e from 'express';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-player-registration',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatOption],
  templateUrl: './player-registration.html',
  styleUrl: './player-registration.css'
})
export class PlayerRegistration {
  eventId!: number;
  profileId!: number;
  registerForm: FormGroup;

  // Predefined Base Price options
  basePrices: number[] = [500,1000,1200,1500,1700,2000,2200,2500,3000,4000,5000,];

  constructor(private fb: FormBuilder, private router: Router) {

    this.registerForm = this.fb.group(
      {
      base_price: [this.basePrices[0], Validators.required],
      availability: [0, Validators.required],
      available_to_be_retained: [true], // default toggle ON
      },
      
    );


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

   onSubmit() {
      if (this.registerForm.valid) {
        const user={
          userName: this.registerForm.value.userName,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };
        const role=this.registerForm.value.role;
  
    //   //  add user service call here
    //    // this.userService.addUser(user, role).subscribe(
    //     //  (data) => {   // success callback
    //     console.log("User registered:", data);
    //     //alert(data);
    //     if(data=="User is already exist !!"){
    //       Swal.fire('Warning !!', data, 'warning');
    //       return;
    //     }else{
    //     Swal.fire({
    //       title:'Success !!', 
    //       text:data, 
    //       icon:'success',
    //     confirmButtonText:'Go to Login',
    //     showCancelButton: true,
    //     cancelButtonText: 'Stay Here',
    //     cancelButtonColor: '#d33',
    //     confirmButtonColor: '#3085d6',
    //   })
    //     .then((result) => { 
    //           if(result.isConfirmed){                   
    //           this.router.navigate(['/login']);
    //       }
    //           else{
    //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //           this.router.navigate(['/register']);
    //     });
    //    }
    //   });
    // }
      
    //    },
  
    //     (error) => {  // error callback
    //     console.error("Registration failed:", error);
    //     //alert('Failed to register user!');
    //     Swal.fire('Error !!', 'Failed to register user', 'error');
    //   });
  
      }
   }

}
