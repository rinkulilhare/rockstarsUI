import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-roles',
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
    MatButtonModule,
    MatSortModule,
     MatPaginatorModule],
  templateUrl: './admin-roles.html',
  styleUrl: './admin-roles.css'
})
export class AdminRoles implements OnInit{
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['userId', 'userName', 'email', 'roles','actions'];
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    
    
  }

  loadUsers(): void {
    this.userService.getUserWithRoles().subscribe((data:any) => {
      const userRoles=JSON.parse(data);
    //  this.users = userRoles.sort((a: any, b: any) => a.userId - b.userId); 
      this.dataSource.data = userRoles;
  });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     this.sort.active = 'userId';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit();
  }

  onViewUser(user: any): void {
    alert(`User: ${user.userId}\nEmail: ${user.email}\nRole: ${user.roleName || 'N/A'}`);
  }
  onDeleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.userId}\nRole: ${user.roleId || 'N/A'}? `)) {
     // this.userService.deleteUserById(user.userId).subscribe(() => this.loadUsers());
    }
  }
}
