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

  changePasswordForm = this.fb.group({
    OldPassword : ['', Validators.required],
    NewPassword : ['', Validators.required],
    ConfirmPassword : ['', Validators.required]
  });

  message: string = "";

  constructor(private fb : FormBuilder, private changePasswordService : PasswordChangeServiceService) { }

  ngOnInit() {
    this.message = "";
  }

  onSubmit(){
    this.changePasswordModel = this.changePasswordForm.value;

    if(this.checkPassword(this.changePasswordModel.NewPassword, this.changePasswordModel.ConfirmPassword))
    {
      this.changePasswordService.updatePassword(this.changePasswordModel).subscribe(
        data=>this.message = "Password successfully changed.",
        (error : HttpErrorResponse) => { this.message = "Old password doesn't match or new password is not in supported format!" }
      );
    }
    else{
      this.message = "Confirmation password does not match the new one!"
    }
  }

  checkPassword(pass: string, confirmPass: string) : boolean{
    return pass == confirmPass;
  }
}
