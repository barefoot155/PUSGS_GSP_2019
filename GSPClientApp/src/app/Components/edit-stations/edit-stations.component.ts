import { Component, OnInit } from '@angular/core';
import { StationServiceService } from 'src/app/Services/station-service.service';
import { StationModel } from 'src/app/Models/stationModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-stations',
  templateUrl: './edit-stations.component.html',
  styleUrls: ['./edit-stations.component.css']
})
export class EditStationsComponent implements OnInit {

  stations : StationModel[] = [];
  selectedStation : StationModel;
  isConflict : boolean = false;

  constructor(private stationService : StationServiceService, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
   }

  ngOnInit() {
    this.isConflict = false;
    this.getAllStations();
  }

  getAllStations(){
    this.stationService.getAllStations().subscribe(
      data => {
        console.log(data);
        this.stations = data;
      });
  }

  onSelectionChanged(event){
    this.isConflict = false;
    this.stationService.getStationByName(event.target.value).subscribe(
      data=>{
        console.log(data);
        this.selectedStation = data;
      })
  }

  onSubmit(){
    this.stationService.updateStation(this.selectedStation).subscribe(
      data => {
        console.log(data);
      },
      error=>{        
        this.isConflict = true;
    });
  }

  discardChanges(){
    this.router.navigate(['/editStation']);    
  }

  overwrite(){
    this.stationService.getStationByName(this.selectedStation.Name).subscribe(
      data=>{
        console.log(data);
        this.selectedStation.RowVersion = data.RowVersion;
        this.onSubmit();
        this.router.navigate(['/editStation']); 
      })
  }
}
