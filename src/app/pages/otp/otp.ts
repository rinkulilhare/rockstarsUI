import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  imports: [ 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css'
})
export class Otp implements OnInit {
  
 // constructor(private fb: FormBuilder) {}
  otpControls: FormControl[] = [
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl('')
  ];

  timer: number = 30; // 30 seconds
  interval: any;
  canResend: boolean = false;

  ngOnInit(): void {
    this.startTimer();
  }

  // Auto focus next input
  moveToNext(event: any, index: number) {
    const input = event.target;
    if (input.value && index < this.otpControls.length - 1) {
      const nextInput = document.getElementById('otp' + (index + 1));
      nextInput?.focus();
    }
  }

  // Submit OTP
  submitOtp() {
    const otp = this.otpControls.map(c => c.value).join('');
    if (otp.length === 4) {
      alert('Entered OTP: ' + otp);
      // Call API here
    } else {
      alert('Please enter a valid OTP');
    }
  }

  // Resend OTP
  resendOtp() {
    this.canResend = false;
    this.timer = 30;
    this.startTimer();
    alert('OTP resent!');
    // Call API to resend OTP here
  }

  // Timer countdown
  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canResend = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}