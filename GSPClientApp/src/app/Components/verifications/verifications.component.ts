import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { UserData } from 'src/app/Models/userData';
import { VerificationStatus } from 'src/app/Models/verificationStatus';
import { CustomerType } from 'src/app/Models/customerType';
import { Router } from '@angular/router';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.css']
})
export class VerificationsComponent implements OnInit {

  users : UserData[];

  constructor(private userService: UserServiceService, private router: Router, private fileServis: UploadFileServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
   }

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

  onVerify(username : string){
    this.userService.verifyUser(username).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/verifications']);
    }
    );
  }

  onDecline(username : string){
    this.userService.declineUser(username).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/verifications']);
    }
    );
  }

  downloadDocument(username: string) {
    this.fileServis.downloadFile(username).subscribe(
      data => {
        this.fileServis.imgSrc = 'data:image/png;base64,' + data;
        this.router.navigate(['/viewimage']);
      },
      error => {
        this.fileServis.imgSrc = 'assets/Images/no_photo.png';
      }
    );
  }
}
