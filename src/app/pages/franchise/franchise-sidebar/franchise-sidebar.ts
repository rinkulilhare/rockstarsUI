import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from "@angular/material/card";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-franchise-sidebar',
  imports: [MatSidenav,
    MatToolbar,
    MatListItem,
    MatIcon,
    MatNavList,
    MatCard,
    MatSidenavModule, MatListModule],
  templateUrl: './franchise-sidebar.html',
  styleUrl: './franchise-sidebar.css'
})
export class FranchiseSidebar {

}
