import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { LineModel } from 'src/app/Models/lineModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineServiceService extends HttpService{
  addNewLine(data: LineModel) : Observable<any>{
    let httpOptions = {
      headers:{
        "Content-type":"application/json"
      }
    }    
    return this.http.post<any>(this.url + 'api/Line/AddNewLine', data, httpOptions);
  }

  updateLine(lineData: LineModel) : Observable<any>{
    return this.http.patch(this.url + "api/Line/UpdateLine", lineData);
  }
  
  getAllStationsByLineNumber(lineNumber : string):Observable<any>{
    return this.http.get<any>(this.url + `api/Line/GetStationsByLineNumber?lineNumber=${lineNumber}`);    
  }
}
