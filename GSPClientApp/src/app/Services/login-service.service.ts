import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginModel } from '../Models/loginModel';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService extends HttpService {

  specificUrl = this.url + 'oauth/token';//+ "api/Login/PostLogin";

  login(data: LoginModel) : Observable<any>{
    let httpOptions = {
      headers:{
        "Content-type":"application/x-www-form-urlencoded"
      }
    }
    let params = `username=${data.UserName}&password=${data.Password}&grant_type=password`;
    //console.log(this.specificUrl+"----"+params);
    return this.http.post(this.specificUrl, params, httpOptions);
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');

    console.log('Logout succeed.');
  }
}
