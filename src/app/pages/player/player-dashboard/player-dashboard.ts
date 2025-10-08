import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../sidebar/sidebar/sidebar';

@Component({
  selector: 'app-player-dashboard',
  imports: [MatSidenavModule,
                MatToolbarModule,
                MatListModule,
                MatIconModule,
                MatButtonModule,
                RouterModule,
                Sidebar],
  templateUrl: './player-dashboard.html',
  styleUrl: './player-dashboard.css'
})
export class PlayerDashboard {

}
