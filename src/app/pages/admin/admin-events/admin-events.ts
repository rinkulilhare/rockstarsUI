import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Event {
  eventName: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

@Component({
  selector: 'app-admin-events',
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    CommonModule
],
  templateUrl: './admin-events.html',
  styleUrl: './admin-events.css'
})
export class AdminEvents implements OnInit{
  showEventForm = false;
  eventForm: FormGroup;
  events: any[] = []; // Events From Table Fetch Here

  displayedColumns: string[] = ['event_name', 'start_date', 'end_date', 'status', 'actions'];

  constructor(private fb: FormBuilder,private eventService:EventService, private router:Router) {
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
        event_status:e.event_status       
     
      }));
    },
      error: (err:any) => console.error('Error fetching Events:', err)
    });
  }
  
  

  ngOnInit(): void {
    this.loadEvents();
  }

  toggleForm() {
    this.showEventForm = !this.showEventForm;
    if (!this.showEventForm) {
      this.eventForm.reset();
    }
  }

  // create Event

  onCreateEvent() {
    if (this.eventForm.valid) {
      const newEvent= {
        event_name:this.eventForm.value.event_name,
        start_date:this.eventForm.value.start_date,
        end_date:this.eventForm.value.end_date

      };
      
      // call createEvent Service
      this.eventService.createEvent(newEvent).subscribe((event)=>{
        console.log("Event:: ",event);
        if(event.startsWith('New Event Created Successfully')){
          Swal.fire('Success !!',event,'success');
          this.loadEvents();
        }else{
          Swal.fire('Error !!',event,'error');
        }
        
      });
    }
  }

  onEditEvent(event: Event) {
    // populate form for editing (optional)
    this.eventForm.setValue({
      eventName: event.eventName,
      startDate: event.startDate,
      endDate: event.endDate
    });
    this.showEventForm = true;

    // optional: remove old entry to replace on save
    this.events = this.events.filter(e => e !== event);
  }

  onDeleteEvent(event: Event) {
    this.events = this.events.filter(e => e !== event);
  }
  onCancel(){
    console.log("Cancle clicked");
  }
}
