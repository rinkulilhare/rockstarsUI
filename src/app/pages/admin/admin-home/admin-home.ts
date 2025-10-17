import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProfileService } from '../../../services/profile-service';
import { UserService } from '../../../services/user-service';
import { count } from 'console';


@Component({
  selector: 'app-admin-home',
  imports: [MatCard,
    MatCardHeader,MatIcon,MatCardModule,CommonModule
  ],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome implements OnInit {


  totalEvents: number = 25;
  totalPlayers: number = 120;
  totalRegistrations: number = 85;
  

  user: any|null=null;
  userCount:any|null=null;
  greetingMessage: string = '';
  userName: string='';
  profile:any|null=null;
  profileStatus!:boolean;

  dashboardCards: any[] = [];

  constructor(private login:LoginService, @Inject(PLATFORM_ID) private platformId: Object,
              private profileService:ProfileService, private router: Router,
              private userService:UserService){

      }//constructor closed

 
   setGreeting(): void {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      this.greetingMessage = 'Good Morning';
    } else if (currentHour < 17) {
      this.greetingMessage = 'Good Afternoon';
    } else if (currentHour < 20) {
      this.greetingMessage = 'Good Evening';
    } else {
      this.greetingMessage = 'Good Night';
    }
  }


//  getUser(){
//   if (isPlatformBrowser(this.platformId)) {
//         const token = localStorage.getItem('jwtToken');
      
//          if(token!=null){
//          this.login.getCurrentUser().subscribe({
//           next: (data) => {
//             console.log("In-current-User")
//           this.user = data;
//            console.log("user:: "+data);
//           }
//       });
//     }


//   }
//   }

 public getPlayerProfileStaus(){
      this.profileService.getPlayerProfile().subscribe(
      profile => {
      this.profileStatus = profile.status
      console.log('Profile ID:', this.profileStatus);
      });
  }


 getUserCount() {
  this.userService.getUsers().subscribe(
   count => {
      this.userCount =  count.length;// convert in case it's a string
      console.log("User Count:", this.userCount);
    }
  );
}

  getCountUsers(){
    this.userService.getUserCount().subscribe(
      count=>{
        this.userCount=count;
        console.log("User Count API: ",this.userCount);
      }
    );
  }





  ngOnInit(): void {

     this.setGreeting();
    //this.getUser();
    this.userName=this.login.getUserName();
    //this.getProfile();
    this.getPlayerProfileStaus();
   // this.userCount=Number(this.userService.getUserCount());
   // this.getUserCount();
    this.getCountUsers();
    console.log("Get UserName From Local: ",localStorage.getItem('userName'));
   
   
    


  }

  goToEvents() {
    console.log("Event HIts")
    this.router.navigate(['/franchise/events']);

   

  }

  goToPlayers() {
    this.router.navigate(['/franchise/players']);
  }

  goToRegistrations() {
    this.router.navigate(['/franchise/registrations']);
  }

  goToAuctions() {
    this.router.navigate(['/franchise/revenue']);
  }

  goToTransactions(){
    console.log("In Transaction: ");
  }
  
  goToUsers(){
    console.log("In Users");
  }

  goToFranchises(){
    console.log("In Franchise")
  }
}

//admin