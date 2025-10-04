import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; 
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';



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

  constructor(private fb: FormBuilder,private loginService:LoginService, private router:Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  //-------------------SESSIONID----------------------
//   onSubmit() {
//     if (this.loginForm.valid) {
//       const user={
//         userName: this.loginForm.value.userName,
//         password: this.loginForm.value.password
//       };
      

//       //add later: call login service
//       this.loginService.loginUser(user).subscribe(
//         (response:any)=>{
      
//            console.log(response);
//            console.log(this.loginForm.value);
//            //alert('Login Successful!');
//           this.loginService.isLogin();
//           this.loginService.getCurrentUser().subscribe(
//             (userRoles:any)=>{
//               console.log(userRoles);
//               console.log(userRoles.length);
               
//               //for multiple roles
//                   userRoles.forEach((userRole:any) => {
//                     console.log(userRole);
                  
//               if(userRole.profileType==='ADMIN'){
//                //console.log(userRole.profileType);
//                //  window.location.href='/admin';
//                  this.router.navigate(['/admin']);

               
//               }else if(userRole.profileType==='PLAYER'){
//                 //console.log(userRole.profileType);
//                 //window.location.href='/player';
//                 this.router.navigate(['/player']);
//               }else if(userRole.profileType==='FRANCHISE'){
//                 //console.log(userRole.profileType);
//                 //window.location.href='/franchise';
//                 this.router.navigate(['/franchise']);
//               }else{
//                 this.loginService.logout();
//               }
//            }) //end of forEach

//    },
//    (error)=>{
//      console.log(error);
//      alert('User Profile Not Fetched, try again!');
//    });
  
//     },(error)=>{
//       console.log(error);
//       alert('Invalid Credentials, try again!');
//     });
//   }



// }
//---------------------SESSIONID-END----------------

//---------------------JWT-START---------------------

  onSubmit() {
  if (this.loginForm.valid) {
    const user = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    this.loginService.loginUser(user).subscribe(
      (token: string) => {
        console.log('JWT:', token);
        // Store token locally
        this.loginService.storeToken(token);

        // Fetch user roles after login
        this.loginService.getCurrentUser().subscribe(
          (userRoles:any) => {
            userRoles.forEach((userRole:any) => {
              console.log("Inside getCurrentUser");
              console.log(userRole)
              if (userRole.profileType === 'ADMIN') {
                console.log("userRole:: ADMIN")
                this.router.navigate(['/admin']);
              } else if (userRole.profileType === 'PLAYER') {
                console.log("userRole:: PLAYER")
                this.router.navigate(['/player']);
              } else if (userRole.profileType === 'FRANCHISE') {
                console.log("userRole:: FRANCHISE")
                this.router.navigate(['/franchise']);
              } else {
                this.loginService.logout();
              }
            });
          },
          error => {
            console.error(error);
            alert('User Profile Not Fetched, try again!');
          }
        );
      },
      error => {
        console.error(error);
        alert('Invalid Credentials, try again!');
      }
    );
  }
}


  }

