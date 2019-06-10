import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ScheduleModel } from 'src/app/Models/scheduleModel';
import { AddScheduleModel } from 'src/app/Models/addSchedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService extends HttpService {
  
    specificUrlSch = this.url + "api/Schedule/GetSchedule";
    specificUrlLines = this.url + "api/Schedule/GetLinesByType";
    
    getScheduleForLine(lineId: string, dayType : number) : Observable<string[]>{
      console.log(lineId + " " + dayType);
      
      return this.http.get<string[]>(this.specificUrlSch + `?lineNumber=${lineId}&dayType=${dayType}`);
    }

    getLinesByType(lineType: number) : Observable<any>{      
      return this.http.get<any>(this.specificUrlLines + `?lineType=${lineType}`);
    }

    getAllLines() : Observable<string[]>{      
      return this.http.get<string[]>(this.url + "api/Schedule/GetAllLines");
    }

    addNewSchedule(schedule : AddScheduleModel) : Observable<any>{
      let httpOptions = {
        headers:{
          "Content-type":"application/json"
        }
      }
      return this.http.post<any>(this.url + "api/Schedule/AddNewSchedule",schedule,httpOptions);
    }
}
