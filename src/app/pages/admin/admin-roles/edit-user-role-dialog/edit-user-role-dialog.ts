import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCellDef } from '@angular/material/table';
import { UserService } from '../../../../services/user-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-role-dialog',
  imports: [CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
      ],
  templateUrl: './edit-user-role-dialog.html',
  styleUrl: './edit-user-role-dialog.css'
})
export class EditUserRoleDialog {
  admin = false;
  player = false;
  franchise = false;
 selectedRoles: string[] = [];
 rolesBody:any=null

  constructor(public userService:UserService, public dialogRef: MatDialogRef<EditUserRoleDialog>,
              @Inject(MAT_DIALOG_DATA) public user: any) {
     // this.selectedRoles = Array.isArray(user.roles) ? [...user.roles]:[]; // Initialize with current roles
    switch(user.roleId) {
      case 1:
        this.admin = true;
        break;
      case 2:
        this.player = true;
        break;
      case 3:
        this.franchise = true;
        break;
    }
  }

  // Assign selected roles to the user
  assignRoles() {
   const selectedValues = [];
    if (this.admin) selectedValues.push(1);
    if (this.player) selectedValues.push(2);
    if (this.franchise) selectedValues.push(3);
    this.rolesBody={role:selectedValues};
    console.log('Selected roles:', selectedValues);
   
    // alert('UserId: '+this.user.userId+
    //   '\nSelected roles: ' + selectedValues.join(', ')+
    //   '\nRoles Body: '+JSON.stringify(this.rolesBody)+
    //   '\nRoleID: '+this.user.roleId+
    //   '\nBody RoleID: '+this.rolesBody)
      console.log(this.rolesBody);

    this.userService.updateUserRoleById(this.user.userId,selectedValues).subscribe(
      (response:any)=>{
        console.log('Role updated successfully:',response);
        
        Swal.fire('Success',response,'success');  
        this.dialogRef.close(true);
    },
    (error:any)=>{
      console.error('Error updating role:',error);
      Swal.fire('Error','Failed to update role','error');
    });

    this.dialogRef.close(selectedValues);
  }

// Close the dialog 

  cancel() {
    this.dialogRef.close();
  }

}
