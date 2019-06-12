import { Component, OnInit, NgZone} from '@angular/core';
import { RealTimeServiceService } from 'src/app/Services/real-time-service.service';
import { Polyline } from 'src/app/Models/polyline';
import { StationModel } from 'src/app/Models/stationModel';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { GeoLocation } from 'src/app/Models/geolocation';
import { ClickService } from 'src/app/Services/click-service.service';


@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class RealTimeComponent implements OnInit {

  public polyline: Polyline;
  public polylineRT: Polyline;  
  public zoom: number = 15;
  startLat : number = 45.242268;
  startLon : number = 19.842954;

  options : string[];
  stations : StationModel[] = [];
  buses : any[];
  busImgIcon : any = {url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}};
  autobusImgIcon : any = {url:"assets/Images/autobus.png", scaledSize: {width: 50, height: 50}};

  isConnected: boolean;
  notifications: string[];
  time: string;

  latitude : string = "";
  longitude : string = "";

  isChanged : boolean = false;

  constructor(private realTimeService : RealTimeServiceService, private ngZone: NgZone, private scheduleService : ScheduleServiceService, private lineService : LineServiceService, private clickService : ClickService) {
    this.isConnected = false;
    this.notifications = [];
   }

  ngOnInit() {
    this.isChanged = false;
    //za combobox izlistaj sve linije
    this.scheduleService.getAllLines().subscribe(
      data =>{
        this.options = data;
      });
    //inicijalizacija polyline
    this.polyline = new Polyline([], 'blue', { url:"assets/Images/busicon.png", scaledSize: {width: 50, height: 50}});

    //za hub
    this.checkConnection();
    //this.subscribeForNotifications();
    this.subscribeForTime();
    //this.realTimeService.registerForClickEvents();
  }

  getStationsByLineNumber(lineNumber : string){
    this.lineService.getAllStationsByLineNumber(lineNumber).subscribe(
      data =>{
        this.stations = data;
        for(var i=0; i<this.stations.length; ++i){
          this.polyline.addLocation(new GeoLocation(this.stations[i].Lat, this.stations[i].Lon));
        }
        console.log(this.stations);
        this.clickService.click(this.stations).subscribe(
          data=>{
            console.log('clicked');
          });
      });
  }

  onSelectionChangeNumber(event){
    this.isChanged = true;
    this.stations = [];
    this.polyline.path = [];
    this.getStationsByLineNumber(event.target.value);   
    
    this.realTimeService.StartTimer(); 
  }

  private checkConnection(){
    this.realTimeService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          this.realTimeService.StartTimer()
        }
    });
  }  

  subscribeForTime() {
    this.realTimeService.registerForTimerEvents().subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: string){
    this.ngZone.run(() => { 
       this.time = time; 
       if(this.isChanged){
          this.latitude = time.split("-")[0];
          this.longitude = time.split("-")[1];
          console.log('lat i lon:' + this.longitude + " " + this.latitude);
       }else{
          this.latitude = "";
          this.longitude = "";
       }
    });  
    console.log(this.time);
  }  

  public startTimer() {    
    this.realTimeService.StartTimer();
  }

  public stopTimer() {
    this.realTimeService.StopTimer();
    this.time = "";
  }

  // public onClick() {
  //   if (this.isConnected) {
  //     this.http.click().subscribe(data => console.log(data));
  //   }
  // }

  // private subscribeForNotifications () {
  //   this.realTimeService.notificationReceived.subscribe(e => this.onNotification(e));
  // }

  // public onNotification(notif: string) {

  //    this.ngZone.run(() => { 
  //      this.notifications.push(notif);  
  //      console.log(this.notifications);
  //   });  
  // }
}
