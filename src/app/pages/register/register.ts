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




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    JsonPipe,],

  
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService:UserService) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4)]],
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
      Swal.fire('Success !!', data, 'success');
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
