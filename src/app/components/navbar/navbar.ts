import { Component,OnInit,signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatMenuModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIconModule,
    MatButtonModule,
  CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  protected readonly title = signal('The Rockstars');

  user: any[] =[];           // <-- Declare the user property
  isLoggedIn: boolean = false;  // <-- Declare login status

  username: string | null = null;
  roles: string[] = [];



  constructor(public login:LoginService,private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object){}

    ngOnInit() {
       if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('jwtToken');
  
    this.login.getCurrentUser().subscribe({
      next: (data) => {

        this.user = data;
        this.isLoggedIn = !!data;
        console.log("user:: "+data);
       
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.isLoggedIn = false;
      }
    });
    console.log("user:: "+this.user);
     
  }else {
      console.log('Running on server, localStorage not available');
    }
  }

  
  
  logout(){
    if(isPlatformBrowser(this.platformId)){
    this.login.logout();
    this.user=[];
    this.router.navigate(['/login']);
  }
}


//------------From token fetch----------

// ngOnInit() {
//   console.log("nav.ts::ngOnInit")
//     const user = this.login.getUserInfo();
//     if (user) {
//       this.username = user.username;
//       console.log("user:: "+this.username);
//       this.roles = user.roles;
//       this.isLoggedIn=true;
//     }else{
//       this.isLoggedIn=false;
//     }
  }





