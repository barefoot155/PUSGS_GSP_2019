import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { LineModel } from 'src/app/Models/lineModel';

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

  constructor(private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data => this.lines = data
    );
    this.getAllStations();
  }

  onSelectionChanged(event){
    this.selectedLine = event.target.value;
    this.scheduleService.getLineDetails(this.selectedLine).subscribe(
      data => this.lineData = data
    );
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

  onSubmit()
  {

  }

}
