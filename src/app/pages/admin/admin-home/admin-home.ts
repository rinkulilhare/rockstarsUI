import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [MatCard,
    MatCardHeader,MatIcon,MatCardModule,
  ],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome implements OnInit {


   totalEvents: number = 25;
  totalPlayers: number = 120;
  totalRegistrations: number = 85;
  totalRevenue: number = 50000;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
