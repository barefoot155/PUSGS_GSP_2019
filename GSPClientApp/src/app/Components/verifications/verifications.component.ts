import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { UserData } from 'src/app/Models/userData';

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

}
