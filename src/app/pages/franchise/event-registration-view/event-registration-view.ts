import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventRegistrationService } from '../../../services/event-registration-service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatOption } from '@angular/material/core'; // For datepicker
import { MatToolbarModule } from '@angular/material/toolbar'; // optional, for top bar

import { EventService } from '../../../services/event-service';
import {  RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { ProfileService } from '../../../services/profile-service';

import { take } from 'rxjs';
import { profile } from 'console';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-event-registration-view',
  imports: [CommonModule,
    
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatOption,MatSelect,
    RouterModule
  ],
  templateUrl: './event-registration-view.html',
  styleUrl: './event-registration-view.css'
})
export class EventRegistrationView {

  eventId!:number;
  eventName: string = '';
  profileId!:number;
  registrations:any[]=[];
  viewMode: string = 'list';
  displayedColumns: string[] = [
    'player_name',
    'player_role',
    'jersery_no',
    'playing_style',
    'specialization',
    'dob',
    'mobile_no',
    'address',
    'base_price',
    'availability',
    'availble_to_be_retained'
  ];

 

  constructor(private router:Router,
              private eventRegistrationService:EventRegistrationService,
               private cdRef:ChangeDetectorRef){
    
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { eventId: number; eventName:string; profileId: number };

    if (state) {
      this.eventId = state.eventId;
      this.eventName=state.eventName;
      this.profileId = state.profileId;
      
      console.log('Event ID:', this.eventId);
      console.log('Profile ID:', this.profileId);
    } else {
      // optional fallback if page is reloaded
      console.warn('No navigation state found.');
    }
  }


  loadRegistrations(eventId: number): void {
    this.eventRegistrationService.showAllEventRegistrationByEventId(eventId).subscribe(
      (data: any[]) => {
        this.registrations = data;
        console.log('registrations Length::', this.registrations.length)
        console.log('Registrations:', this.registrations);
         this.cdRef.detectChanges();
      },
      error => {
        console.error('Error fetching registrations', error);
      }
    );
  }

   goBack() {
    console.log("goBack");
    this.router.navigate(['/franchise/event']); // adjust route as needed
  }

   printTable() {
    const printContents = document.querySelector('.event-card')?.innerHTML;
    const originalContents = document.body.innerHTML;
    if(printContents){
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // reload to restore Angular bindings
     //this.router.navigate(['francise/events']);
    }
  }

  


  ngOnInit(): void {
     
      this.loadRegistrations(this.eventId);
    }
}
