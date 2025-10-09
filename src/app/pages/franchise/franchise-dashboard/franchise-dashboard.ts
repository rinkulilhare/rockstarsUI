import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { FranchiseSidebar } from '../franchise-sidebar/franchise-sidebar';

@Component({
  selector: 'app-franchise-dashboard',
  imports: [RouterModule,
    FranchiseSidebar
  ],
  templateUrl: './franchise-dashboard.html',
  styleUrl: './franchise-dashboard.css'
})
export class FranchiseDashboard {

}
