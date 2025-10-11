import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../../services/profile-service';

@Component({
  selector: 'app-profile',
  imports: [MatCard, 
            MatCardModule, 
            CommonModule, 
            RouterModule, ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{

     constructor(private profileService:ProfileService, 
                 private router:Router){}

     status: boolean=false; 
     profile: any|null; 
    
    
     ngOnInit(): void {
       this.profileService.getUserProfile().subscribe({
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
    // open dialog or navigate to update form
    console.log('Update profile clicked');
    this.router.navigate(['/admin/update-profile']);
  }

  resetProfile(){
    console.log('resetProfile');
  }
}
