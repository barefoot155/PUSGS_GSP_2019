import { Component, OnInit } from '@angular/core';
import { CustomerType } from 'src/app/Models/customerType';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  
    selectedFile : File;
    imageSrc : string;
    customerType : CustomerType = CustomerType.Regular;
  
    constructor(private uploadFileService : UploadFileServiceService) { }
  
    ngOnInit() {
      this.imageSrc = 'assets/Images/no_photo.png';
      this.customerType = this.uploadFileService.customerType;
    }
  
    onFileChanged(event) {
      this.uploadFileService.selectedFile = event.target.files[0];
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  
    onSubmit(value : CustomerType){
      this.uploadFileService.customerType = value;
    }
  
    custTypeEvent(type : CustomerType){
      return false;
    }
  }
