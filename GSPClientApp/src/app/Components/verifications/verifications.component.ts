import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { UserData } from 'src/app/Models/userData';
import { VerificationStatus } from 'src/app/Models/verificationStatus';
import { CustomerType } from 'src/app/Models/customerType';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {

  users : UserData[];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe( data => {
      this.users = data;
    });
  }

  statusToString(status : VerificationStatus) : string{
    return VerificationStatus[status];
  }

  typetoString(type : CustomerType) : string{
    return CustomerType[type];
  }
}
