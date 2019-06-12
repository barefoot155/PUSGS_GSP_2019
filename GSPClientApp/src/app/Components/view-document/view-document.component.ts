import { Component, OnInit } from '@angular/core';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {

  imgSrc: string = 'assets/Images/no_photo.png';

  constructor(private fileService: UploadFileServiceService) { }

  ngOnInit() {
    this.imgSrc = this.fileService.imgSrc;
  }
}
