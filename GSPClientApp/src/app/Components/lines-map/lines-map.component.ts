import { Component, OnInit, Input, NgZone } from '@angular/core';
import { MarkerInfo } from 'src/app/Models/marker-info';
import { Polyline } from 'src/app/Models/polyline';
import { GeoLocation } from 'src/app/Models/geolocation';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { StationModel } from 'src/app/Models/stationModel';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';

@Component({
  selector: 'app-lines-map',
  templateUrl: './lines-map.component.html',
  styleUrls: ['./lines-map.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}'] //postavljamo sirinu i visinu mape
})
export class LinesMapComponent implements OnInit {

  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  startLat : number = 45.242268;
  startLon : number = 19.842954;

  options : string[];
  stations : StationModel[] = [];
  busImgIcon : any = {url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}};

  
  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data =>{
        this.options = data;
      });

    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/Images/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

    this.polyline = new Polyline([], 'blue', { url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}});
  }
  constructor(private ngZone: NgZone, private lineService : LineServiceService, private scheduleService : ScheduleServiceService){
  }

  // placeMarker($event){
  //   this.polyline.addLocation(new GeoLocation($event.coords.lat, $event.coords.lng))
  //   console.log(this.polyline)
  // }

  getStationsByLineNumber(lineNumber : string){
    this.lineService.getAllStationsByLineNumber(lineNumber).subscribe(
      data =>{
        console.log(data);
        for(var i=0; i<this.stations.length; ++i){
          console.log(i);
          this.polyline.addLocation(new GeoLocation(this.stations[i].Lat, this.stations[i].Lon));
        }
        this.stations = data;
      });
  }
  onSelectionChangeNumber(event){
    this.getStationsByLineNumber(event.target.value);
     
  }
}
