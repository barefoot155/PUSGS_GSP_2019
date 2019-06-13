import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from 'src/app/Services/http.service';
import { ChangePasswordModel } from 'src/app/Models/changePasswordModel';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeServiceService extends HttpService {

  updatePassword(model : ChangePasswordModel){
    return this.http.post(this.url + "api/Account/ChangePassword", model);
  }
}
