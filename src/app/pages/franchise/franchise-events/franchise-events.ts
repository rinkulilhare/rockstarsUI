import { Component } from '@angular/core';
import { AdminDashboard } from "../../admin/admin-dashboard/admin-dashboard";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core'; // For datepicker
import { MatToolbarModule } from '@angular/material/toolbar'; // optional, for top bar
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event-service';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ProfileService } from '../../../services/profile-service';

import { take } from 'rxjs';
import { profile } from 'console'
import { EventRegistrationService } from '../../../services/event-registration-service';

interface Event {
  eventName: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

@Component({
  selector: 'app-franchise-events',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    RouterModule],
  templateUrl: './franchise-events.html',
  styleUrl: './franchise-events.css'
})
export class FranchiseEvents {

showEventForm = false;
  isEditForm=false;
  editedEventId: number | null = null;
  eventForm: FormGroup;
  events: any[] = []; // Events From Table Fetch Here
  profileId: number|null=null;
  profileStatus!:boolean;
  registrations:any[]=[];  //registered playersDetails fetch from here
  
 
  displayedColumns: string[] = ['event_name', 'start_date', 'end_date', 'status', 'Hits', 'actions'];

  constructor(private fb: FormBuilder,
              private eventService:EventService,
              private profileService:ProfileService,
              private router:Router,
              private cdRef:ChangeDetectorRef,
              private eventRegistrationService: EventRegistrationService) {
    this.eventForm = this.fb.group({
      event_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      event_status: []
       });
      }

      // Step 2: Fetch existing event and patch values
    public loadEvents():void {
    this.eventService.showEvent().subscribe({
      next: (event:any) => {
        this.events=event.map((e:any)=>({
        event_name:e.event_name,  
        start_date:e.start_date,
        end_date:e.end_date,
        event_status:e.event_status,
        event_id:e.event_id       
     
      }))
      .sort((a:any, b:any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
      
      //There you can load registration counts if needed
      this.events.forEach(event => {
        this.eventRegistrationService.getEventRegCountByEventId(event.event_id)
        .subscribe(count => {
          event.registrationCount = count;
        });
      });


      
      // Trigger Another Check after async data Update
      this.cdRef.detectChanges();
    },
      error: (err:any) => console.error('Error fetching Events:', err)
    });
  }

  // loadRegistrations(eventId: number): void {
  //   this.eventRegistrationService.showAllEventRegistrationByEventId(eventId).subscribe(
  //     (data: any[]) => {
  //       this.registrations = data;
  //       console.log('registrations Length::', this.registrations.length)
  //       console.log('Registrations:', this.registrations);
  //        this.cdRef.detectChanges();
  //     },
  //     error => {
  //       console.error('Error fetching registrations', error);
  //     }
  //   );
  // }

  getProfileStatus(){
    this.profileService.getFranchiseProfile().subscribe(
      profile=>{
        this.profileStatus=profile.status
      });
  }

  onView(event:any){
    if(this.profileStatus===true){
    this.router.navigateByUrl('/franchise/event-reg-view',{state:{
        eventId:event.event_id,
        eventName:event.event_name,
      
      }
    });
  }else{
     Swal.fire({
        icon: 'warning',
        title: 'Warning !!',
        html: 'Your Profile is Not Active <br> Please Update Your Profile First',
        confirmButtonText: 'Go to Profile',
        confirmButtonColor: '#f44336'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/franchise/franchise-profile']); // change this route as needed
        }
      });
  }
}

  



  ngOnInit(): void {
      
      this.loadEvents();
   //   this.loadRegistrations(0);
      this.getProfileStatus();
    }
}
