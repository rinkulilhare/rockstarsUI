import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  
   
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user={
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password
      };
      

      //add later: call login service
      this.loginService.loginUser(user).subscribe(
        (response:any)=>{
      
           console.log(response);
           console.log(this.loginForm.value);
      alert('Login Successful!');
    },
    (error)=>{
      console.log(error);
      alert('Invalid Credentials, try again!');
    }
      );
  }
  }

  onForgotPassword() {
    alert('Redirecting to Get UserId / Reset Password page...');
    // later: route to reset-password component
  }
}

