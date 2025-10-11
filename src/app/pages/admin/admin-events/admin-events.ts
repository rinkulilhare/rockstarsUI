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
  events: any[] = [
    { event_name: 'Annual Meetup', start_date: '2025-10-15', end_date: '2025-10-16', active: true },
    { event_name: 'Tech Conference', start_date: '2025-11-01', end_date: '2025-11-02', active: false },
    { event_name: 'Holiday Party', start_date: '2025-12-20', end_date: '2025-12-20', active: true }
  ]; // Replace with service call in real app

  displayedColumns: string[] = ['event_name', 'start_date', 'end_date', 'status', 'actions'];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      event_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  toggleForm() {
    this.showEventForm = !this.showEventForm;
    if (!this.showEventForm) {
      this.eventForm.reset();
    }
  }

  onCreateEvent() {
    if (this.eventForm.valid) {
      const newEvent: Event = {
        ...this.eventForm.value,
        active: true
      };
      this.events.push(newEvent);
      this.eventForm.reset();
      this.showEventForm = false;
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
