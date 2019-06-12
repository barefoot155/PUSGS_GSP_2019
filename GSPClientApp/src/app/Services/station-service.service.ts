import { Injectable } from '@angular/core';
import { StationModel } from 'src/app/Models/stationModel';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService extends HttpService {

  addNewStation(data: StationModel) : Observable<any>{
    let httpOptions = {
      headers:{
        "Content-type":"application/json"
      }
    }    
    return this.http.post<any>(this.url + 'api/Station/AddNewStation', data, httpOptions);
  }
  
  getAllStations() : Observable<any>{
    return this.http.get<any>(this.url + `api/Station/GetAllStations`);
  }

  getStationByName(name : string) : Observable<any>{
    return this.http.get<any>(this.url + `api/Station/GetStationByName?name=${name}`);
  }
  updateStation(station : StationModel) : Observable<any>{
    let httpOptions = {
      headers:{
        "Content-type":"application/json"
      }
    }    
    return this.http.post<any>(this.url + 'api/Station/UpdateStation', station, httpOptions);
  }

  removeStationByName(stationName: string) : Observable<any>
  {
    return this.http.delete(this.url + `api/Station/RemoveStation?stationName=${stationName}`);
  }
}
