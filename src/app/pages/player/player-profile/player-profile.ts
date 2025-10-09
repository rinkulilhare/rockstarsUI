import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../../services/profile-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-profile',
  imports: [MatCard, MatCardModule, CommonModule],
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css'
})
export class PlayerProfile implements OnInit{

   constructor(private profileService:ProfileService,
               private router:Router ){}

     status: boolean=false;  
     profile:any|null;
    
      ngOnInit() {
         this.profileService.getPlayerProfile().subscribe({
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
    this.router.navigate(['player/update-profile']);
  }


}
