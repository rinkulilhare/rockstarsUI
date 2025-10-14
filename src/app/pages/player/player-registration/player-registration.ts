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
import { MatOption, MatSelect } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-player-registration',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatOption, 
    MatSelect, MatProgressBarModule,
    MatSliderModule],
  templateUrl: './player-registration.html',
  styleUrl: './player-registration.css'
})
export class PlayerRegistration {
  eventId!: number;
  profileId!: number;
  eventName!: string;
  registerForm: FormGroup;

  // Predefined Base Price options
  basePrices: number[] = [500,1000,1200,1500,1700,2000,2200,2500,3000,4000,5000,];
  availabilityOptions = [0, 25, 50, 75, 100];
  availble_to_be_retained:string[] = ["Yes", "No", "N.A. (FirstTimeEnroll)", "N.A. (UnSold)"    ];

  progressColor: 'primary' | 'accent' | 'warn' = 'primary';
  progressClass:string='warn'

  constructor(private fb: FormBuilder, private router: Router) {

    this.registerForm = this.fb.group(
      {
      base_price: ['', Validators.required],
      availability: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      availble_to_be_retained: ['',Validators.required], 
      },
      
    );


    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { eventId: number; eventName:string; profileId: number };

    if (state) {
      this.eventId = state.eventId;
      this.profileId = state.profileId;
      this.eventName = state.eventName;
      console.log('Event ID:', this.eventId);
      console.log('Profile ID:', this.profileId);
    } else {
      // optional fallback if page is reloaded
      console.warn('No navigation state found.');
    }
  }


   public checkAvailability() {
    console.log("checkAvailability")
  const value = this.registerForm.get('availability')?.value || 0;

    if (value <= 25) this.progressClass = 'warn';      // red
   else if (value <= 50) this.progressClass = 'accent'; // orange
   else if (value <= 75) this.progressClass = 'primary'; // blue-ish (can style later)
    else this.progressClass = 'success';               // green (custom class needed)
  }

   onSubmit() {
      if (this.registerForm.valid) {
        const res={
          base_price: this.registerForm.value.base_price,
          availble_to_be_retained: this.registerForm.value.availble_to_be_retained,
          availability: this.registerForm.value.availability
        };
        console.log(res)
  
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

   onCancel(){
    console.log("Clicked Cancle");
    this.router.navigate(['/player/events']);
   }

  

}
