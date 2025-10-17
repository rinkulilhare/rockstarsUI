import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProfileService } from '../../../services/profile-service';


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
  greetingMessage: string = '';
  userName: string='';
  profile:any|null=null;
  profileStatus!:boolean;

  dashboardCards: any[] = [];

  constructor(private login:LoginService, @Inject(PLATFORM_ID) private platformId: Object,
              private profileService:ProfileService, private router: Router){

    
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





  ngOnInit(): void {

     this.setGreeting();
    //this.getUser();
    this.userName=this.login.getUserName();
    //this.getProfile();
    this.getPlayerProfileStaus();

    console.log("Get UserName From Local: ",localStorage.getItem('userName'));
   
     this.dashboardCards = [
      { title: 'Events', value: this.totalEvents || 0, subtitle: 'Total events created', icon: 'event', class: 'events-card', action: this.goToEvents.bind(this) },
      { title: 'Players', value: this.totalPlayers || 0, subtitle: 'Registered players', icon: 'people', class: 'players-card', action: this.goToPlayers.bind(this) },
      { title: 'Registrations', value: this.totalRegistrations || 0, subtitle: 'Completed registrations', icon: 'assignment_turned_in', class: 'registrations-card', action: this.goToRegistrations.bind(this) },
      { title: 'Franchises', value: '05', subtitle: 'Total franchises managed', icon: 'apartment', class: 'franchise-card', action: this.goToFranchises.bind(this) },
      { title: 'Users', value: '88', subtitle: 'Total registered users', icon: 'person', class: 'users-card', action: this.goToUsers.bind(this) },
      { title: 'Auctions', value: '09', subtitle: 'Total auctions conducted', icon: 'gavel', class: 'auctions-card', action: this.goToAuctions.bind(this) },
      { title: 'Transactions', value: '999', subtitle: 'Total transactions completed', icon: 'payment', class: 'transactions-card', action: this.goToTransactions.bind(this) },
    ];


  }

  goToEvents() {
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
