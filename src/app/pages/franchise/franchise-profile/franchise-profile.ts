import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../../services/profile-service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-franchise-profile',
  imports: [MatCard, MatCardModule, CommonModule],
  templateUrl: './franchise-profile.html',
  styleUrl: './franchise-profile.css'
})
export class FranchiseProfile implements OnInit{

  
 constructor(private profileService: ProfileService, private router:Router){}

     status: boolean=false; 
     profile:any|null;

     ngOnInit() {
         this.profileService.getFranchiseProfile().subscribe({
          next:(user:any)=>{
          this.profile=user;
        },
        error:(err:any)=>{
          console.log("Error while Fetching Profile:", err);
          this.profile=null;
        }
        });
      }
    

  updateProfile() {
    console.log('Update profile clicked');
    this.router.navigate(['/franchise/update-profile']);
  }
}
