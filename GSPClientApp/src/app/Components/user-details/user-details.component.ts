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
    console.log(this.userDetails);
    this.userService.updateUserData(this.userDetails).subscribe(
      result => console.log(result)
    );
  }

  typetoString(type : CustomerType) : string{
    return CustomerType[type];
  }
  statusToString(status : VerificationStatus) : string{
    return VerificationStatus[status];
  }
}
