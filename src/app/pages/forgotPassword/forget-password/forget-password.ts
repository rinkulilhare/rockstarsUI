import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { PasswordService } from 'src/app/services/password.service';


@Component({
  selector: 'app-forget-password',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,   
    CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {

  forgotForm: FormGroup;

  constructor(private fb: FormBuilder,private passwordService:PasswordService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      console.log('Forgot password request for:', email);

      // Call your API here
      this.passwordService.forgotPassword(email).subscribe(
        (response:any)=>{
          console.log(response);
          alert('Password reset link sent to your email.');
        },
        (error:any)=>{
          console.log(error);
          alert('Error sending password reset link. Please try again.');
        } 
      );
    }
  }

  onReset() {
    this.forgotForm.reset();
  }


}
