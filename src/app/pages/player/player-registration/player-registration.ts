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
import { EventRegistrationService } from '../../../services/event-registration-service';


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

  constructor(private fb: FormBuilder, private router: Router, private eventRegistrationService:EventRegistrationService) {

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


    //Event-Registration Save
   onSubmit() {
      if (this.registerForm.valid) {
        const playerEventRegDetails={
          base_price: this.registerForm.value.base_price,
          availble_to_be_retained: this.registerForm.value.availble_to_be_retained,
          availability: this.registerForm.value.availability
        };
        console.log(playerEventRegDetails)
  
       // Event Registration Service Create
         this.eventRegistrationService.createEventRegistration(this.eventId, playerEventRegDetails).subscribe(
            (data) => {       
                  console.log("Player Registered For Event:", data);
    //     //alert(data);
           if(data=="Already Registered"){
           Swal.fire('Warning !!', data, 'warning');
           return;
        }else{
         Swal.fire({
           title:'Success !!', 
           text:data, 
           icon:'success',
         confirmButtonText:'OK',
         showCancelButton: true,
         cancelButtonText: 'Go Back',
         cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
       })
         .then((result) => { 
               if(result.isConfirmed){                   
               this.router.navigate(['/player/events']);
           }
               else{
               this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
               this.router.navigate(['/player/events']);
         });
        }
       });
     }
      
        },
  
      (error) => {  // error callback
        console.error("Registration failed:", error);
        //alert('Failed to register user!');
         Swal.fire('Error !!', 'Failed to register user', 'error');
       });
  
      }
   }

   onCancel(){
    console.log("Clicked Cancle");
    this.router.navigate(['/player/events']);
   }

  

}
