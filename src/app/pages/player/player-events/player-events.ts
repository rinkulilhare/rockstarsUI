import { Component } from '@angular/core';
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
import { PlayerProfile } from '../player-profile/player-profile';
import { take } from 'rxjs';
import { profile } from 'console';
import { EventRegistrationService } from '../../../services/event-registration-service';


interface Event {
  eventName: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

@Component({
  selector: 'app-player-events',
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
    
  templateUrl: './player-events.html',
  styleUrl: './player-events.css'
})
export class PlayerEvents {

  showEventForm = false;
  isEditForm=false;
  editedEventId: number | null = null;
  eventForm: FormGroup;
  events: any[] = []; // Events From Table Fetch Here
  profileId: number|null=null;
  isProfileActive!:boolean;
  registrationData:any|null;
  
 
  displayedColumns: string[] = ['event_name', 'start_date', 'end_date', 'status', 'actions'];

  constructor(private fb: FormBuilder,
              private eventService:EventService,
              private playerProfile:ProfileService,
              private router:Router,
              private cdRef:ChangeDetectorRef,
              private eventRegistrationService:EventRegistrationService) {
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
      // Trigger Another Check after async data Update
      this.cdRef.detectChanges();
    },
      error: (err:any) => console.error('Error fetching Events:', err)
    });
  }

  public getPlayerProfileId(){
      this.playerProfile.getPlayerProfile().subscribe(profile => {
      this.profileId = profile.player_profile_id;
      this.isProfileActive=profile.status;
      console.log('Profile ID:', this.profileId);
      });
  }

  public getRegStatus(): void {
  
  this.eventRegistrationService.getAllEventRegistrations().subscribe(
    regData=>{
      this.registrationData=regData;
      console.log("Registration Data:: ",this.registrationData);
    }
  );
}

   // Returns true if the current profile has registered for this event
  isApplied(eventId: number): boolean {
    return this.registrationData.some((reg:any) => 
      reg.event_id === eventId && 
      reg.player_profile_id === this.profileId &&  reg.registration_status
    );
  }
 
  
  
  ngOnInit(): void {
      this.loadEvents();
     this.getPlayerProfileId();
     this.getRegStatus();
    }
  
     
      //Register for Event
      onRegister(event: any) {
      this.getPlayerProfileId();
      console.log('Event_id:', event.event_id);
      console.log('Profile_Id:', this.profileId );
      // TODO: Add your registration logic here
      if(this.isProfileActive===true){

      this.router.navigateByUrl('/player/event-register',{state:{
        eventId:event.event_id,
        eventName:event.event_name,
        profileId:this.profileId
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
      this.router.navigate(['/player/player-profile']); // change this route as needed
    }
  });
  }
}

    onCancel(){
      console.log("Cancle clicked");
      this.eventForm.reset();
      this.showEventForm=false;
      this.isEditForm=false;
      this.editedEventId=null;
    }
 
}
