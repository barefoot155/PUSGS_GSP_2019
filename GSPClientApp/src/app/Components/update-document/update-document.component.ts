import { Component, OnInit } from '@angular/core';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';
import { CustomerType } from 'src/app/Models/customerType';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})
export class UpdateDocumentComponent implements OnInit {

  selectedFile : File;
  imageSrc : string;
  customerType : CustomerType;

  constructor(private uploadFileService : UploadFileServiceService) { }

  ngOnInit() {
    this.imageSrc = 'assets/Images/no_photo.png';
    let username = localStorage.username;
    this.uploadFileService.getCustomerType(username).subscribe(
      data => this.customerType = data
    );

    this.uploadFileService.downloadFile(username).subscribe(
      data => {
        this.imageSrc = 'data:image/png;base64,' + data;
      },
      error =>{
        this.imageSrc = 'assets/Images/no_photo.png';
      }
    );
  }

  onFileChanged(event) {
    this.uploadFileService.selectedFile = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(){
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.uploadFileService.postFile(uploadData, localStorage.username).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  typeToString(type : CustomerType) : string{
    return CustomerType[type];
  }
}
