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
  isConflict : boolean = false;
  message : string = "";

  constructor(private scheduleService : ScheduleServiceService, private lineService: LineServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
   }

  ngOnInit() {
    this.message = "";
    this.isConflict = false;
    this.scheduleService.getAllLines().subscribe(
      data => this.lines = data
    );
    this.getAllStations();
  }

  onSelectionChanged(event){
    this.isConflict = false;
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
    this.message = "";
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
    if(this.isValid())
    {
      this.lineData.Stations = this.selectedStations;
      this.lineService.updateLine(this.lineData).subscribe(data => {
        console.log(data);
        this.message = "Line updated."
      },
        error => {
          this.isConflict = true;
          this.message = "This object has been modified.";
        }
      );
    }
    else{
      this.message = "Error! Line number is required";
    }
  }

  removeLine(){
    this.lineService.removeLineById(this.lineData.Id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/editlines']);
    });
  }

  discardChanges(){
    this.router.navigate(['/editlines']);    
  }

  overwrite(){
    this.scheduleService.getLineById(this.lineData.Id).subscribe(
      data=>{
        console.log(data);
        this.lineData.RowVersion = data.RowVersion;
        this.onSubmit();
        this.router.navigate(['/editlines']); 
      })
  }

  isValid()
  {
    if(this.lineData.Number){
      return true;
    }
    else{
      return false;
    }
  }
}
