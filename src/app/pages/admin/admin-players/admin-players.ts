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
import { MatDialog } from '@angular/material/dialog';
//import { EditUserRoleDialog } from './edit-user-role-dialog/edit-user-role-dialog';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-players',
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
    MatPaginatorModule,
  MatButtonModule,
MatCheckboxModule],
  templateUrl: './admin-players.html',
  styleUrl: './admin-players.css'
})
export class AdminPlayers implements OnInit{
  users: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['userId', 'userName', 'email','status','actions'];
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService:UserService,
              public dialog: MatDialog) { }


    ngOnInit(): void {
    this.loadUsers();
        
  }

  loadUsers(): void {
    this.userService.getUsersHavingPlayer().subscribe((data:any) => {
      const userRoles=JSON.parse(data);
    //  this.users = userRoles.sort((a: any, b: any) => a.userId - b.userId); 
      this.dataSource.data = userRoles;
  });
  }

   ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     setTimeout(() => {
     this.sort.active = 'userId';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit();
  });
}

//open edit role dialog
  onEditRole(user: any): void {
    //alert(`User: ${user.userId}\nEmail: ${user.email}\nRole: ${user.roleName || 'N/A'}`);
    Swal.fire('info', 'Function Available Soon', 'info');
  //   const dialogRef=this.dialog.open(EditUserRoleDialog, {
  //     width: '400px',
  //     data: user
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadUsers();
  //     }   
  // });
}

//delete user
  onDeleteUser(user: any): void {

    Swal.fire('info', 'Function Available Soon', 'info');
  //    Swal.fire({
  //   title: `Are you sure you want to delete ${user.userName}?`,
  //   html: `<strong>Role: ${user.roleName || 'N/A'}</strong>`,
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'Cancel'
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     this.userService.deleteUserRoleById(user.userId,user.roleId).subscribe(
  //       (data) => {
  //               Swal.fire('Success', data, 'success'),
        
  //       this.loadUsers();
  //       },
  //       (error) => 
  //         Swal.fire('Error', error, 'error')
  //     );
  //   }
  // });
}

//view user Profile-Player details
  onViewUser(user: any): void {
    Swal.fire('info', 'Function Available Soon', 'info');
  }

}
