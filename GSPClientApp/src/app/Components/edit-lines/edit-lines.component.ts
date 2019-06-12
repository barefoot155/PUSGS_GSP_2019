import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { LineModel } from 'src/app/Models/lineModel';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  lines : string[];
  selectedLine : string;
  lineData : LineModel = null;
  allStations : string[];
  IsChecked : boolean = false;
  selectedStations : string[] = [];

  constructor(private scheduleService : ScheduleServiceService, private lineService: LineServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
   }

  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data => this.lines = data
    );
    this.getAllStations();
  }

  onSelectionChanged(event){
    if(event.target.value != "-- Please Select --"){
      this.selectedLine = event.target.value;
      this.scheduleService.getLineDetails(this.selectedLine).subscribe(
        data => this.lineData = data
      );
    }
  }

  getAllStations(){
    this.scheduleService.getAllStations().subscribe(
      data => this.allStations = data
    );
  }

  IsInList(stationName : string) : boolean
  {
    this.IsChecked = false;

    this.lineData.Stations.forEach(element => {
      if(element == stationName)
      {
        this.IsChecked = true;
      }
    });

    return this.IsChecked;
  }

  onStationChange(event){
    let checked = event.target.checked;
    let station = event.target.value;

    if(checked)
    {
      this.selectedStations.push(station);
    }
    else
    {
      const index: number = this.selectedStations.indexOf(station);
      if (index !== -1) {
          this.selectedStations.splice(index, 1);
      }
    }
  }

  onSubmit()
  {
    this.lineData.Stations = this.selectedStations;
    this.lineService.updateLine(this.lineData).subscribe(data => console.log(data));
  }

  removeLine(){
    this.lineService.removeLineById(this.lineData.Id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/editlines']);
    });
  }
}
