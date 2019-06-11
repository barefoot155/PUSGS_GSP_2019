import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { CustomerType } from 'src/app/Models/customerType';
import { HttpHeaders } from '@angular/common/http';

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

  downloadFile(username) : Observable<any>{
    let specificUrl = "api/Registration/DownloadFile";
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.get(this.url + specificUrl + `?username=${username}`);
  } 

  getCustomerType(username: string) : Observable<CustomerType>
  {
    return this.http.get<CustomerType>(this.url + `api/Registration/GetCustomerType?username=${username}`);
  }
}
