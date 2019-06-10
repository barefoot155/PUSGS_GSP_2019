import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserData } from 'src/app/Models/userData';
import { VerificationStatus } from '../Models/verificationStatus';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends HttpService {

  getUserData(username : string) : Observable<UserData>
  {
    return this.http.get<UserData>(this.url + `api/Login/GetUserData?username=${username}`);
  }

  updateUserData(data : UserData) : Observable<any> {
    let httpOptions = {
      headers:{
        "Content-type":"application/json"
      }
    }
    //let params = `username=${data.UserName}&password=${data.Password}`;
    return this.http.patch<any>(this.url + "api/Login/UpdateUserData", data, httpOptions);
  }
  
  getAllUsers() : Observable<UserData[]>{
    return this.http.get<UserData[]>(this.url + "api/Login/GetAllUsers");
  }

  verifyUser(username : string) : Observable<any>{
    return this.http.get(this.url + `api/Registration/VerifyAppUser?username=${username}`);
  }
  declineUser(username: string) : Observable<any>{
    return this.http.get(this.url + `api/Registration/DeclineAppUser?username=${username}`);
  }

  getUserDocument(username : string) : Observable<any> {
    const options = { responseType: 'blob' as 'json' }
    return this.http.get<any>(this.url + `api/Registration/GetDocument?username=${username}`, { headers: new HttpHeaders().append("Content-Type", "application/json")});
  }
}
