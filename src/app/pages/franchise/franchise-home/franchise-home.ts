import { Component } from '@angular/core';
import { ProfileService } from '../../../services/profile-service';
import { LoginService } from '../../../services/login-service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-franchise-home',
  imports: [CommonModule],
  templateUrl: './franchise-home.html',
  styleUrl: './franchise-home.css'
})
export class FranchiseHome {


  user: any|null=null;
  greetingMessage: string = '';
  userName: string='';
  profile:any|null=null;
  profileStatus!:boolean;

  constructor(private login:LoginService, @Inject(PLATFORM_ID) private platformId: Object,
              private profileService:ProfileService){

}

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

  public getFranchiseProfileStaus(){
      this.profileService.getFranchiseProfile().subscribe(
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
    this.getFranchiseProfileStaus();
   
  }

}
