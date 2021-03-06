import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/Services/register-service.service';
import { Router } from '@angular/router';
import { UploadDocumentComponent } from 'src/app/Components/upload-document/upload-document.component';
import { CustomerType } from 'src/app/Models/customerType';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', [Validators.required, Validators.email]],
    Password : ['', Validators.required],
    ConfirmPassword : ['', Validators.required],
    Name : ['', Validators.pattern],
    Surname : ['', Validators.pattern],
    PhoneNumber : ['', Validators.pattern],
    DateOfBirth : ['', Validators.pattern],
    Address : ['']
  });

  moreOptionsActive : boolean = false;
  file : File = null;

  constructor(private fb : FormBuilder, private registerService : RegisterServiceService, private router:Router, private fileUploadService : UploadFileServiceService) { }

  ngOnInit() {
    if(this.isLoggedIn()){
      this.router.navigate(['/']);
    }

    this.fileUploadService.selectedFile = null;
  }

  onSubmit()
  {
    this.file = this.fileUploadService.selectedFile;

    let user = this.registerForm.value as User;
    user.CustomerType = this.fileUploadService.customerType;
    if(this.checkPassword(user.Password, user.ConfirmPassword))
    {
      this.registerService.register(user).subscribe(data => {
        if(this.file != null && user.CustomerType!=CustomerType.Regular){
          this.uploadFileToServer();
        }
        console.log('Registration succeed.');
        
        this.router.navigate(['/login']);
      });
    }
  }

  optionsClick(){
    this.moreOptionsActive = !this.moreOptionsActive;
  }

  uploadFileToServer() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.file, this.file.name);
    this.fileUploadService.postFile(uploadData, this.registerForm.value.UserName).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  isLoggedIn(){
    return localStorage.getItem('username') != undefined;
  }

  checkPassword(pass: string, confirmPass: string) : boolean{
    return pass == confirmPass;
  }
}
