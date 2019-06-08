import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserData } from 'src/app/Models/userData';
import { VerificationStatus } from '../Models/verificationStatus';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends HttpService {

  getAllUsers() : Observable<UserData[]>{
    return this.http.get<UserData[]>(this.url + "api/Login/GetAllUsers");
  }

  verifyUser(username : string) : Observable<any>{
    return this.http.get(this.url + `api/Registration/VerifyAppUser?username=${username}`);
  }
  declineUser(username: string) : Observable<any>{
    return this.http.get(this.url + `api/Registration/DeclineAppUser?username=${username}`);
  }
}
