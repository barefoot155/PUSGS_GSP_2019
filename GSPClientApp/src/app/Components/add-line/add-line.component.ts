import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { LineType } from 'src/app/Models/lineType';
import { LineModel } from 'src/app/Models/lineModel';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})
export class AddLineComponent implements OnInit {

  allStations : string[];
  lineType : LineType =  LineType.Urban;
  lineNumber : string;
  selectedStations : string[] = [];
  message : string = "";

  constructor(private lineService : LineServiceService, private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
    this.message = "";
    this.getAllStations();
  }

  onSubmit(){
    if(this.isValid()){
      let lineData = new LineModel();
      lineData.Number = this.lineNumber;
      lineData.LineType = this.lineType;
      lineData.Stations = this.selectedStations;
      this.lineService.addNewLine(lineData).subscribe(
        data =>{
          console.log(data);
          this.message = "Line added successfully";
      });
    }
    else{
      this.message = "Error! Line number is required";
    }
  }

  isValid(){
    if(this.lineNumber){
      return true;
    }
    else{
      return false;
    }
  }

  getAllStations(){
    this.scheduleService.getAllStations().subscribe(
      data => this.allStations = data
    );
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
}
