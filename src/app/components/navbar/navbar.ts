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
import { ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms'; // 
import { MatDividerModule } from '@angular/material/divider';

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
  CommonModule,
  FormsModule,
  MatDividerModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  protected readonly title = signal('The Rockstars');

  user: any[] =[];           // <-- Declare the user property
  isLoggedIn: boolean = false;  // <-- Declare login status

  username: string | null = null;
  
  roles: string[] = [];
  selectedRole: string = '';



  constructor(public login:LoginService,private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
   private cd: ChangeDetectorRef){}

    ngOnInit() {
  
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('jwtToken');

   
        if(token!=null){
         this.login.getCurrentUser().subscribe({
          next: (data) => {
            console.log("In-current-User")
          this.user = data;
          this.isLoggedIn = !!data;
          console.log("user:: "+data);

          //------------------set Role----------------

              this.roles=this.login.getUserRoles();
              console.log(this.roles);
              //detectChange
              //this.cd.markForCheck(); 
              //set default role
                if(this.roles.length>0){
                   
                this.selectedRole=this.roles[0]
                // this.cd.detectChanges();
                  }

                   // Force Angular to update the view
                   this.cd.detectChanges();
                  //setTimeout(() => this.cd.detectChanges(), 0);

                console.log("BEFOR CHANGE:: "+this.selectedRole);
                      this.cd.detectChanges();
                console.log("AFTER CHANGE:: "+this.selectedRole);

                

       
       },
        error: (err) => {
        console.error('Error fetching user:', err);
        this.isLoggedIn = false;
      }
    
    });
  }
    console.log("user:: "+this.user);
     
  }else {
      console.log('Running on server, localStorage not available');
    }


    

  }

  
  
  logout(){
    if(isPlatformBrowser(this.platformId)){
    this.login.logout();
    this.user=[];
    this.roles=[];  //updated
    this.selectedRole='';  //updated
   // window.location.reload();
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

        onRoleSubmit() {
            console.log("ROle Submit:: ",this.selectedRole)
           switch (this.selectedRole) {
           case 'ADMIN':
           this.router.navigate(['/admin']);
            break;
           case 'PLAYER':
           this.router.navigate(['/player']);
             break;
            case 'FRANCHISE':
            this.router.navigate(['/franchise']);
            break;
            default:
            console.warn('Unknown role:', this.selectedRole);
            break;
          }
        }

    }





