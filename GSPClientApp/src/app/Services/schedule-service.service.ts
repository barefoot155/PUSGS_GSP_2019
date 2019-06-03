import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ScheduleModel } from 'src/app/Models/scheduleModel';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService extends HttpService {
  
    specificUrl = this.url + "api/Schedule/GetSchedule";

    getScheduleForLine(lineId: string) : Observable<ScheduleModel[]>{
      console.log(lineId);
      
      return this.http.get<ScheduleModel[]>(this.specificUrl + `?lineNumber=${lineId}`);
    }
}
