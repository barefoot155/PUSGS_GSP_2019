import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginModel } from '../Models/loginModel';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService extends HttpService {

  specificUrl = this.url + "api/Login/PostLogin";

  login(data: LoginModel){
    let httpOptions = {
      headers:{
        "Content-type":"application/json"
      }
    }
    //let params = `username=${data.UserName}&password=${data.Password}`;
    this.http.post<any>(this.specificUrl, data, httpOptions).subscribe(d => console.log(d));
  }
}
