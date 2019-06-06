import { Component, OnInit } from '@angular/core';
import { ChangePasswordModel } from 'src/app/Models/changePasswordModel';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordChangeServiceService } from 'src/app/Services/password-change-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordModel : ChangePasswordModel;
  validationErrors = [];

  changePasswordForm = this.fb.group({
    OldPassword : ['', Validators.required],
    NewPassword : ['', Validators.required],
    ConfirmPassword : ['', Validators.required]
  });

  constructor(private fb : FormBuilder, private changePasswordService : PasswordChangeServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.changePasswordModel = this.changePasswordForm.value;
    this.changePasswordService.updatePassword(this.changePasswordModel).subscribe(
      data=>console.log(data),
      (error : HttpErrorResponse) => console.log(error)
    );
  }
}
