import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user-service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
@Component({
  selector: 'app-admin-franchises',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './admin-franchises.html',
  styleUrl: './admin-franchises.css'
})
export class AdminFranchises implements OnInit{

  showForm = false;
  isEditForm = false;
  editedFranchiseId: number | null = null;
  franchiseForm: FormGroup;
  franchises: any[] = [];

  displayedColumns: string[] = ['userId','userName', 'email' , 'status', 'actions'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.franchiseForm = this.fb.group({
     // name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: [''],
     // password: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(4),Validators.pattern(/^[a-zA-Z][a-zA-Z0-9.]*$/)]],
    // email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['FRANCHISE']  // Default role is FRANCHISE
    },
    { validators: this.passwordMatchValidator }
  );
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  ngOnInit(): void {
    this.loadFranchises();
  }

   loadFranchises(): void {
    this.userService.getUsersHavingFranchise().subscribe({
      next: (res: any) => {
        try {
          // Backend sends text response, so parse it
         // const parsed = JSON.parse(res);
         //const users=res;
          console.log(res);
          this.franchises = JSON.parse(res);
          this.cdRef.detectChanges();
        } catch (e) {
          console.error('Invalid JSON from API:', res);
        }
      },
      error: (err) => console.error('Error loading franchises:', err)
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
     this.enablePasswordValidators();
    }else{
      this.franchiseForm.reset();
      this.isEditForm = false;
      this.editedFranchiseId = null;
    }
  }

  onSaveFranchise(): void {
    if (this.franchiseForm.valid) {
      //const data = this.franchiseForm.value;
       const user={
        userName: this.franchiseForm.value.userName,
        email: this.franchiseForm.value.email,
        password: this.franchiseForm.value.password
      };
      const role=this.franchiseForm.value.role;
      const userId=this.franchiseForm.value.userId;
      const userEmail={email:this.franchiseForm.value.email};
      if (this.isEditForm && this.editedFranchiseId) {
        // Normally, you'd have update endpoint. If not, just show message
      console.log("isEditForm= ",this.isEditForm);
      console.log("editedFranchise= ",this.editedFranchiseId); 
      console.log("USerId= ",userId);  
      
        this.userService.updateUserEmailById(userEmail,this.editedFranchiseId).subscribe(
          (res)=>{
            if(res=="Email Update Successfully"){
            Swal.fire('Success !!',res,'success');
            this.loadFranchises();
            }
            else{
              Swal.fire('Warning!', res, 'warning');
            }
          }
        )
       // Swal.fire('Info', 'Update API not implemented yet.', 'info');
      } else {
        console.log("User:: ",user,"Role:: ",role);
        this.userService.addUser(user, role).subscribe({
          next: (res) => {
            if (res.includes('Successfully')) {
              Swal.fire('Success!', res, 'success');
              this.loadFranchises();
              this.toggleForm();
            } else {
              Swal.fire('Warning!', res, 'warning');
            }
          },
          error: (err) => Swal.fire('Error', 'Something went wrong.', 'error')
        });
      }
    }
  }

  onEditFranchise(franchise: any): void {
    this.isEditForm = true;
    this.editedFranchiseId = franchise.userId;
    this.showForm = true;
    console.log("OnEdit Clicked");
    console.log(this.isEditForm);
    console.log(this.editedFranchiseId);

    this.franchiseForm.patchValue({
      userName: franchise.userName,
      email: franchise.email,
     // id: franchise.userId,
      password:'' // optional, you can leave blank
    });
    // // Disable username and password fields
   //  this.franchiseForm.get('username')?.disable();
    // this.franchiseForm.get('password')?.disable();
    // this.franchiseForm.get('confirmPassword')?.disable();

    // this.franchiseForm.get('username')?.clearValidators();
  //   this.franchiseForm.get('password')?.clearValidators()
  //   this.franchiseForm.get('confirmPassword')?.clearValidators();
  //   this.franchiseForm.clearValidators();
  //   this.franchiseForm.updateValueAndValidity();
  //  this.franchiseForm.get('username')?.updateValueAndValidity();
  //  this.franchiseForm.get('password')?.updateValueAndValidity();
  //  this.franchiseForm.get('confirmPassword')?.updateValueAndValidity();

  this.disablePasswordValidators();
  }

  onDeleteFranchise(franchise: any): void {
    const userId=franchise.userId;
    console.log("onDelete UserId:: ",userId)
    this.userService.deleteUserById(userId).subscribe(
      (res)=>{
        if(res=="User Deleted"){
          Swal.fire('Success !!', res, 'success');
          this.loadFranchises();
        }else{
          Swal.fire('Warning !!',res,'warning');
        }
      });
    
  }

  onViewFranchise(franchise: any): void {
    this.router.navigateByUrl('/admin/franchise-view', {
      state: { franchiseId: franchise.user_id }
    });
  }

  onCancel(): void {
    this.franchiseForm.reset();
    this.showForm = false;
    this.isEditForm = false;
    this.editedFranchiseId = null;
  }

  private enablePasswordValidators(): void {
  this.franchiseForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
  this.franchiseForm.get('confirmPassword')?.setValidators([Validators.required]);
  this.franchiseForm.setValidators(this.passwordMatchValidator);
  this.franchiseForm.updateValueAndValidity();
}

private disablePasswordValidators(): void {
  //this.franchiseForm.get('password')?.clearValidators();
  this.franchiseForm.get('password')?.clearValidators();
  this.franchiseForm.get('confirmPassword')?.clearValidators();
  this.franchiseForm.clearValidators(); // removes form-level password match validator
  this.franchiseForm.updateValueAndValidity();
}
}
