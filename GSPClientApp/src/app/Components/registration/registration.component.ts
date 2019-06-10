import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterServiceService } from 'src/app/Services/register-service.service';
import { Router } from '@angular/router';
import { UploadDocumentComponent } from 'src/app/Components/upload-document/upload-document.component';
import { CustomerType } from 'src/app/Models/customerType';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.required],
    Password : ['', Validators.required],
    ConfirmPassword : ['', Validators.required],
    Name : [''],
    Surname : [''],
    PhoneNumber : [''],
    DateOfBirth : [''],
    Address : ['']
  });

  moreOptionsActive : boolean = false;
  file : File = null;
  customerType : CustomerType;

  constructor(private fb : FormBuilder, private registerService : RegisterServiceService, private router:Router, private fileUploadService : UploadFileServiceService) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.file = this.fileUploadService.selectedFile;
    this.customerType = this.fileUploadService.customerType;

    this.registerService.register(this.registerForm.value).subscribe(data => {
      if(this.file != null){
        this.uploadFileToServer();
      }
      console.log('Registration succeed.');
      
      this.router.navigate(['/login']);
    });
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
}
