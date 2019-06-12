import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { StationModel } from 'src/app/Models/stationModel';

@Injectable({
    providedIn: 'root'
  })
export class ClickService extends HttpService{

    click(stations : StationModel[]): Observable<any> {
        let httpOptions = {
            headers:{
              "Content-type":"application/json"
            }
          } 

        return this.http.post(this.url+`api/RealTime/SendStationsToHub`,stations,httpOptions);
    }
}
