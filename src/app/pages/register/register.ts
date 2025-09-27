import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserService } from '../../services/user-service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import e from 'express';






@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    ],

  
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService:UserService, private router:Router) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4),Validators.pattern(/^[a-zA-Z][a-zA-Z0-9.]*$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['PLAYER']  // Default role is PLAYER
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user={
        userName: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      const role=this.registerForm.value.role;

    //  add user service call here
      this.userService.addUser(user, role).subscribe(
        (data) => {   // success callback
      console.log("User registered:", data);
      //alert(data);
      if(data=="User is already exist !!"){
        Swal.fire('Warning !!', data, 'warning');
        return;
      }else{
      Swal.fire({
        title:'Success !!', 
        text:data, 
        icon:'success',
      confirmButtonText:'Go to Login',
      showCancelButton: true,
      cancelButtonText: 'Stay Here',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    })
      .then((result) => { 
            if(result.isConfirmed){                   
            this.router.navigate(['/login']);
        }
            else{
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/register']);
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
}

