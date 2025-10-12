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
  isEditForm=false;
  editedEventId: number | null = null;
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
        event_status:e.event_status,
        event_id:e.event_id       
     
      }))
      .sort((a:any, b:any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
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
      this.isEditForm=false; //edit form
      this.editedEventId=null; //edit form
      
    }
  }

  // create Event

  onSaveEvent() {
    if (this.eventForm.valid) {
      const eventData= {
        event_name:this.eventForm.value.event_name,
        start_date:this.eventForm.value.start_date,
        end_date:this.eventForm.value.end_date

      };

      if (this.isEditForm && this.editedEventId) {
      //  UPDATE EXISTING EVENT
      this.eventService.updateEvent(this.editedEventId, eventData).subscribe((res) => {
       if(res=='Event Updated Successfully !!'){
        Swal.fire('Updated!', res, 'success');
        this.loadEvents();
        this.toggleForm();
       }else{
        Swal.fire('Oopss!', res, 'warning');
       }

      });
    } else{
      
      // call createEvent Service
      this.eventService.createEvent(eventData).subscribe((event)=>{
        console.log("Event:: ",event);
        if(event.startsWith('New Event Created Successfully')){
          Swal.fire('Success !!',event,'success');
          this.loadEvents();
          this.toggleForm();
        }else{
          Swal.fire('Error !!',event,'error');
        }
        
      });
    }
  }
  }
  onEditEvent(event: any) {
    this.isEditForm=true;
    this.editedEventId=event.event_id;
    this.showEventForm=true;

    this.eventForm.patchValue({
      event_name: event.event_name,
      start_date: event.start_date,
      end_date: event.end_date,
      event_status: event.event_status

    });
    

    // optional: remove old entry to replace on save
   // this.events = this.events.filter(e => e !== event);
  }


  // delete event
  onDeleteEvent(event: any) {
    console.log(event);
    const eventId=event.event_id;
    if (confirm(`Are you sure you want to delete "${event.event_name}"?`)){
      this.eventService.deleteEvent(eventId).subscribe(
        (res)=>{
          Swal.fire('Success !!', res, 'success');
          this.events=this.events.filter(e=>e.event_id!==eventId);
        },
        (err)=>{
           Swal.fire('Oppsss !!', 'Something Went Wrong', 'warning');

        }
      );
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
