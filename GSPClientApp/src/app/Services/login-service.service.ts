import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginModel } from '../Models/loginModel';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(this.specificUrl+"----"+params);
    return this.http.post(this.specificUrl, params, httpOptions);
  }

  logout(){
    localStorage.setItem('username',undefined);
    localStorage.setItem('jwt',undefined);
    localStorage.setItem('role',undefined);

    console.log('Logout succeed.');
  }
}
