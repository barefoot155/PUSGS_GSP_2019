import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Polyline } from 'src/app/Models/polyline';
import { GeoLocation } from 'src/app/Models/geolocation';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { StationModel } from 'src/app/Models/stationModel';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';

@Component({
  selector: 'app-lines-map',
  templateUrl: './lines-map.component.html',
  styleUrls: ['./lines-map.component.css'],
  styles: ['agm-map {height: 700px; width: 1200px;}'] //postavljamo sirinu i visinu mape
})
export class LinesMapComponent implements OnInit {

  public polyline: Polyline;
  public zoom: number = 15;
  startLat : number = 45.242268;
  startLon : number = 19.842954;

  options : string[];
  stations : StationModel[] = [];
  busImgIcon : any = {url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}};

  previous : any;

  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data =>{
        this.options = data;
      });

    this.polyline = new Polyline([], 'blue', { url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}});
  }
  constructor(private ngZone: NgZone, private lineService : LineServiceService, private scheduleService : ScheduleServiceService){
  }

  getStationsByLineNumber(lineNumber : string){
    if(lineNumber != "-- Please select --"){
      this.lineService.getAllStationsByLineNumber(lineNumber).subscribe(
        data =>{
          this.stations = data;
          for(var i=0; i<this.stations.length; ++i){
            this.polyline.addLocation(new GeoLocation(this.stations[i].Lat, this.stations[i].Lon));
          }
        });
    }
  }
  onSelectionChangeNumber(event){
    this.stations = [];
    this.polyline.path = [];
    this.getStationsByLineNumber(event.target.value);
  }

  clickedMarker(infoWindow){
    if(this.previous)
    {
      this.previous.close();
    }
    this.previous = infoWindow;
  }
}
