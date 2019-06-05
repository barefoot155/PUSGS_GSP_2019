import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ScheduleModel } from 'src/app/Models/scheduleModel';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService extends HttpService {
  
    specificUrlSch = this.url + "api/Schedule/GetSchedule";
    specificUrlLines = this.url + "api/Schedule/GetLinesByType";
    
    getScheduleForLine(lineId: string, dayType : number) : Observable<ScheduleModel[]>{
      console.log(lineId + " " + dayType);
      
      return this.http.get<ScheduleModel[]>(this.specificUrlSch + `?lineNumber=${lineId}&dayType=${dayType}`);
    }

    getLinesByType(lineType: number) : Observable<any>{      
      return this.http.get<any>(this.specificUrlLines + `?lineType=${lineType}`);
    }
}
