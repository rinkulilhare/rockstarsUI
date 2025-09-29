import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PasswordService } from '../../../services/password-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private passwordService: PasswordService, private router: Router, private ngxService: NgxUiLoaderService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (!this.forgotForm.valid) return;

    const email = this.forgotForm.value.email;

    this.passwordService.requestOtp(email).subscribe({
      next: (response: any) => {
        if (response === 'No User Found With This Email') {
          Swal.fire('Oops!', response, 'warning');
        } else {
          Swal.fire('Success', response, 'success').then(() => {
            this.openOtpPopup(email);
          });
        }
      },
      error: () => Swal.fire('Error', 'Something went wrong', 'error')
    });
  }

  openOtpPopup(email: string) {
    let timer = 30;
    let interval: any;
    
    Swal.fire({
      title: 'Enter OTP',
      html: `
        <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 15px;">
          <input id="otp1" maxlength="1" style="width: 40px; text-align: center; font-size: 20px;" />
          <input id="otp2" maxlength="1" style="width: 40px; text-align: center; font-size: 20px;" />
          <input id="otp3" maxlength="1" style="width: 40px; text-align: center; font-size: 20px;" />
          <input id="otp4" maxlength="1" style="width: 40px; text-align: center; font-size: 20px;" />
        </div>
        <div style="margin-top: 10px; font-size: 14px;">
          <span id="resendText">Resend available in <b>${timer}</b>s</span>
          <a href="#" id="resendLink" style="display:none;">Resend</a>
        </div>
      `,
      confirmButtonText: 'Verify',
      focusConfirm: false,
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      didOpen: () => {
        // OTP box navigation
        const inputs = ['otp1', 'otp2', 'otp3', 'otp4'].map(id => document.getElementById(id) as HTMLInputElement);
        inputs.forEach((input, i) => {
          input.addEventListener('input', () => {
            if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
          });
          input.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Backspace' && !input.value && i > 0) inputs[i - 1].focus();
          });
        });

        // Timer for resend
        const resendText = document.getElementById('resendText')!;
        const resendLink = document.getElementById('resendLink')!;
        interval = setInterval(() => {
          timer--;
          resendText.innerHTML = `Resend available in <b>${timer}</b>s`;
          if (timer <= 0) {
            clearInterval(interval);
            resendText.style.display = 'none';
            resendLink.style.display = 'inline';
          }
        }, 1000);

        // Resend OTP click
        resendLink.addEventListener('click', (e) => {
          e.preventDefault();
          resendLink.style.display = 'none';
          resendText.style.display = 'inline';
          timer = 30;
          resendText.innerHTML = `Resend available in <b>${timer}</b>s`;

          interval = setInterval(() => {
            timer--;
            resendText.innerHTML = `Resend available in <b>${timer}</b>s`;
            if (timer <= 0) {
              clearInterval(interval);
              resendText.style.display = 'none';
              resendLink.style.display = 'inline';
            }
          }, 1000);

          this.passwordService.requestOtp(email).subscribe(() => {
            Swal.showValidationMessage('OTP resent successfully!');
          });
        });
      },
      preConfirm: async () => {
        const otp =
          (document.getElementById('otp1') as HTMLInputElement).value +
          (document.getElementById('otp2') as HTMLInputElement).value +
          (document.getElementById('otp3') as HTMLInputElement).value +
          (document.getElementById('otp4') as HTMLInputElement).value;

        if (otp.length < 4) {
          Swal.showValidationMessage('Please enter all 4 digits');
          return false;
        }

        // Verify OTP via backend
        try {
          const res: any = await this.passwordService.verifyOtp(email, otp).toPromise();
          if (res === 'OTP Validated') {
            return true;
          } 
            
          else {
            Swal.showValidationMessage(res);
            return false;
          }
        } catch {
          Swal.showValidationMessage('Verification failed');
          return false;
        }
      },
      willClose: () => clearInterval(interval)
    }).then(async (result) => {
  if (result.isConfirmed) {
   

    // Get backend message properly
    let msg = '';
    this.ngxService.start(); 
    try {
      const res: any = await this.passwordService.forgetPassword(email).toPromise();
         msg = res
    //   console.log(msg);
    //   console.log(res);
     } catch {
         msg = 'exception';
     }
    

    // SweetAlert with backend message + login link
    
    Swal.fire({
      icon: 'success',
      html: `
        <div style="font-size: 18px; font-weight: bold;">OTP Verified Successfully!</div>
        <div style="font-size: 14px; margin-top: 5px;">${msg}</div>
        <a href="#" id="loginLink" style="display:block; margin-top:15px; color:#3085d6; font-weight:bold;">Go to Login</a>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
          loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.router.navigate(['/login']); // Angular route navigation
            Swal.close(); // optional
            this.ngxService.stop();
          });
        }
      }
    });
  }
});
  }
  onReset() {
    this.forgotForm.reset();
  }
}
