import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserData } from 'src/app/Models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends HttpService {

  getAllUsers() : Observable<UserData[]>{
    return this.http.get<UserData[]>(this.url + "api/Login/GetAllUsers");
  }
}
