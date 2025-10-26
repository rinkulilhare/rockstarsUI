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
import { EventService } from '../../../services/event-service';
import { EventRegistrationService } from '../../../services/event-registration-service';


@Component({
  selector: 'app-admin-home',
  imports: [MatCard,
    MatCardHeader,MatIcon,MatCardModule,CommonModule
  ],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome implements OnInit {


  //totalEvents: number = 25;
 // totalPlayers: number = 120;
  //totalRegistrations: number = 85;
  

  user: any|null=null;
  userCount:any|null=null;
  eventCount:any|null=null;
  registrationCount:any|null=null;
  playerCount:any|null=null; 
  franchiseCount:any|null=null;
  auctionCount:any|null=null;
  transactionCount:any|null=null  
  greetingMessage: string = '';
  userName: string='';
  profile:any|null=null;
  profileStatus!:boolean;

  dashboardCards: any[] = [];

  constructor(private login:LoginService, @Inject(PLATFORM_ID) private platformId: Object,
              private profileService:ProfileService,
              private router: Router,
              private userService:UserService,
              private eventService:EventService,
              private eventRegistrationService:EventRegistrationService
              ) {

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
// User Count API
  getCountUsers(){
    this.userService.getUserCount().subscribe(
      count=>{
        this.userCount=count;
        console.log("User Count API: ",this.userCount);
      }
    );
  }

  // Get Event Count API
  getCountEvents(){
    this.eventService.getEventCount().subscribe(
      count=>{
        this.eventCount=count;
        console.log("Event Count API: ",this.eventCount);
      }
    );
  }

  // Get Registration Count API
  getCountRegistrations(){
    this.eventRegistrationService.getEventRegCount().subscribe(
      count=>{
        this.registrationCount=count;
        console.log("Registration Count API: ",this.registrationCount);
      }
    );
  }  

  // Get Player Count API
  getCountPlayers(){
    this.profileService.getPlayerCount().subscribe(
      count=>{
        this.playerCount=count;
        console.log("Player Count API: ",this.playerCount);
      }
    );
  }  

  // Get Franchise Count API
  getCountFranchise(){
    this.profileService.getFranchiseCount().subscribe(
      count=>{
        this.franchiseCount=count;
        console.log("Player Count API: ",this.franchiseCount);
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
    this.getCountEvents();
    this.getCountRegistrations();
    this.getCountPlayers();
    this.getCountFranchise(); 
    console.log("Get UserName From Local: ",localStorage.getItem('userName'));
   
   
    


  }

  goToEvents() {
    console.log("Event HIts")
    this.router.navigate(['/franchise/events']);

   

  }

  goToPlayers() {
    this.router.navigate(['/admin/players']);
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