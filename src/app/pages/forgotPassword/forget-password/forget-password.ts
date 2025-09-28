import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { PasswordService  } from '../../../services/password-service';
import Swal from 'sweetalert2'

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

  constructor(private fb: FormBuilder, private passwordService: PasswordService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      console.log('Forgot password request for:', email);
      Swal.fire('Processing', 'Please wait...', 'info');
      // Call your API here
      this.passwordService.forgetPassword(email).subscribe(
        (response:any)=>{
          console.log(response);
          if(response==='No User Found'){
            Swal.fire(
                    'Oops!', response,'warning');  // can be 'success', 'error', 'warning', 'info', 'question'
                    
                 
            
          }else{ Swal.fire('Success', response, 'success');
          }
        },
        (error:any)=>{
          console.log(error);
          Swal.fire('Error', 'Something went wrong or User Not Found', 'error');
        } 
      );
    }
  }

  onReset() {
    this.forgotForm.reset();
  }


}
