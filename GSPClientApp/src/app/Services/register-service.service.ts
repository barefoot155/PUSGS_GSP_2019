import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { User } from 'src/app/Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService extends HttpService{

  specificUrl = this.url + "api/Registration/PostRegistration";
  
    register(data: User) : Observable<any>{
      let httpOptions = {
        headers:{
          "Content-type":"application/json"
        }
      }
      //let params = `username=${data.UserName}&password=${data.Password}`;
      return this.http.post<any>(this.specificUrl, data, httpOptions);
    }
}
