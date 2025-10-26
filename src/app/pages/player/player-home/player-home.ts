import { Component } from '@angular/core';
import { LoginService } from '../../../services/login-service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProfileService } from '../../../services/profile-service';


@Component({
  selector: 'app-player-home',
  imports: [CommonModule],
  templateUrl: './player-home.html',
  styleUrl: './player-home.css'
})
export class PlayerHome {

  user: any|null=null;
  greetingMessage: string = '';
  userName: string='';
  profile:any|null=null;
  profileStatus!:boolean;

  constructor(private login:LoginService, @Inject(PLATFORM_ID) private platformId: Object,
              private profileService:ProfileService){

    
  }//constructor closed

  setGreeting(): void {
    const currentHour = new Date().getHours();

     if (currentHour >=4 && currentHour < 12) {
      this.greetingMessage = 'Good Morning';
    } else if (currentHour >=12 && currentHour < 16) {
      this.greetingMessage = 'Good Afternoon';
    } else if (currentHour >=16 && currentHour < 21) {
      this.greetingMessage = 'Good Evening';
    } else {
      this.greetingMessage = 'Welcome Back';
    }
  }

  getUser(){
  if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('jwtToken');
      
         if(token!=null){
         this.login.getCurrentUser().subscribe({
          next: (data) => {
            console.log("In-current-User")
          this.user = data;
           console.log("user:: "+data);
          }
      });
    }


  }
  }

  // getProfile(){
  // this.profileService.getPlayerProfile().subscribe({
  //         next:(user:any)=>{
  //         this.profile=user;
  //         this.profileStatus=this.profile.status;
  //       },
  //       error:(err:any)=>{
  //         console.log("Error while Fetching Profile:", err);
  //         this.profile=null;
  //       }
  //       });
  //     }

      public getPlayerProfileStaus(){
      this.profileService.getPlayerProfile().subscribe(
      profile => {
      this.profileStatus = profile.status
      console.log('Profile ID:', this.profileStatus);
      });
  }

  ngOnInit(): void {
    this.setGreeting();
    this.getUser();
    this.userName=this.login.getUserName();
    //this.getProfile();
    this.getPlayerProfileStaus();
   
  }

}
