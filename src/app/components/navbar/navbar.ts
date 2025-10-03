import { Component,signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  protected readonly title = signal('The Rockstars');

  constructor(public login:LoginService){}
  
  logout(){
    this.login.logout();
  }

}
