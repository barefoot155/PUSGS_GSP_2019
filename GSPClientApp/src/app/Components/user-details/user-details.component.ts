import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/Models/userData';
import { LoginServiceService } from 'src/app/Services/login-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userDetails : UserData;
  isChanged : boolean = false;

  constructor(private loginService : LoginServiceService, private fb : FormBuilder) { }

  ngOnInit() {
    this.loginService.getUserData(localStorage.getItem("username")).subscribe(
      data => this.userDetails = data,
      error => console.log(error)
    );
  }

  onChange(event){
    this.isChanged = true;
  }

  onSubmit(email : string, name : string, surname : string, address : string, number : string, date : string){
    this.userDetails.Email = email;
    this.userDetails.Name = name;
    this.userDetails.Surname = surname;
    this.userDetails.Address = address;
    this.userDetails.PhoneNumber = number;
    this.userDetails.DateOfBirth = date;
    this.loginService.updateUserData(this.userDetails).subscribe(
      result => console.log(result)
    );
  }

}
