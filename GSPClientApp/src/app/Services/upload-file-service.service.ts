import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { CustomerType } from 'src/app/Models/customerType';

@Injectable({
  providedIn: 'root'
})
export class UploadFileServiceService extends HttpService {

  selectedFile: File;
  customerType : CustomerType = CustomerType.Regular;

  postFile(uploadData: FormData, username: string): Observable<any> {
    const endpoint = this.url + `api/Registration/PostDocument?username=${username}`;
    return this.http.post(endpoint, uploadData);
  }
}
