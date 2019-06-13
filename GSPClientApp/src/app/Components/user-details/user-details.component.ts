import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/Models/userData';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerType } from 'src/app/Models/customerType';
import { VerificationStatus } from 'src/app/Models/verificationStatus';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetails : UserData;
  isChanged : boolean = false;
  emailRegExp = new RegExp('^[a-zA-Z0-9\\.\\_]+@[a-zA-Z]+\\.[a-zA-Z]+$');
  nameRegExp = new RegExp('^(\\s)*|([A-Za-z]*)');
  numberRegExp = new RegExp('^(\\s)*(|[0-9]{3}\\/[0-9]{7})');
  dateRegExp = new RegExp("^(\\s)*((0[1-9]|1[0-2])\\.(0[1-9]|1\\d|2\\d|3[01])\\.((19|20)\\d{2})\\.)$");

  constructor(private userService : UserServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userService.getUserData(localStorage.getItem("username")).subscribe(
      data => this.userDetails = data,
      error => console.log(error)
    );
  }

  onChange(event){
    this.isChanged = true;
  }

  onSubmit(){
    if(this.validate())
    {
      console.log('its valid');
      this.userService.updateUserData(this.userDetails).subscribe(
        result => console.log(result)
      );
    }
    else{
      console.log('its not valid');
    }
  }

  typetoString(type : CustomerType) : string{
    return CustomerType[type];
  }
  statusToString(status : VerificationStatus) : string{
    return VerificationStatus[status];
  }

  validate(): boolean {
    if(this.emailRegExp.test(this.userDetails.Email) && this.nameRegExp.test(this.userDetails.Name) && this.nameRegExp.test(this.userDetails.Surname)
      && this.numberRegExp.test(this.userDetails.PhoneNumber) && this.dateRegExp.test(this.userDetails.DateOfBirth))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
