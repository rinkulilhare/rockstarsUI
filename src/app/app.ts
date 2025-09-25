import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';  
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet,
            CommonModule,
           MatButtonModule,
           MatToolbarModule,
           MatCardModule,
           MatIconModule,
           MatGridListModule,
           MatChipsModule,
           MatBadgeModule,
           MatMenuModule,
           Navbar,
           Footer,
           ReactiveFormsModule,
           MatFormFieldModule,
           MatInputModule,
         ],
           
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  

  heroStats = [
    { number: '500+', label: 'Players' },
    { number: '12', label: 'Teams' },
    { number: '25K+', label: 'Viewers' },
    { number: '3', label: 'Years' }
  ]

  features = [
    {
      title: 'The Auction',
      description: 'Experience the excitement as teams are built and talent is recognized. Watch as cricket stars get their moment to shine in our thrilling auction process.',
      icon: 'gavel',
      buttonText: 'Learn More',
      avatarClass: 'bg-primary'
    },
    {
      title: 'The Matches',
      description: 'Follow the thrilling matches and cheer for your local heroes. Every game is a celebration of skill, determination, and community pride.',
      icon: 'sports_cricket',
      buttonText: 'View Schedule',
      avatarClass: 'bg-success'
    },
    {
      title: 'Community & Culture',
      description: 'More than a game, it\'s a celebration of our spirit and unity. Bringing families and neighbors together through the love of cricket.',
      icon: 'people',
      buttonText: 'Join Us',
      avatarClass: 'bg-warning'
    }
  ];

  impactStats = [
    { value: '₹5L+', description: 'Raised for Community' },
    { value: '100+', description: 'Dreams Supported' },
    { value: '15+', description: 'Villages Connected' },
    { value: '3', description: 'Years of Impact' }
  ];

  callToActions = [
    { icon: 'support', text: 'Support a Player', color: 'primary' },
    { icon: 'volunteer_activism', text: 'Volunteer', color: 'accent' },
    { icon: 'business', text: 'Sponsor an Event', color: 'warn' }
  ];

  ngOnInit() {
    console.log('Rockstar Foundation App Initialized');
  }

}
