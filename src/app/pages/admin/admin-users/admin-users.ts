import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  imports: [MatIcon,
    MatCard,
    MatMenuModule,
    MatCardModule,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatHeaderCell,
    MatRowDef,
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {
  users: any[] = [];

  displayedColumns: string[] = ['userId', 'userName', 'email', 'status', 'actions'];
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data:any) => {
      this.users = JSON.parse(data);
    });
  }
  onViewUser(user: any): void {
    alert(`User: ${user.userName}\nEmail: ${user.email}\nRole: ${user.roleName || 'N/A'}`);
  }
  onDeleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.userName}?`)) {
      this.userService.deleteUserById(user.userId).subscribe(() => this.loadUsers());
    }
  }
}
