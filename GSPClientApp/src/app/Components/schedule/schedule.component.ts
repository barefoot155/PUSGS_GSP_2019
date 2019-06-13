import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { FormBuilder } from '@angular/forms';
import { ScheduleModel } from 'src/app/Models/scheduleModel';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  
  schedules : string[];
  lines : string[];
  scheduleTableHeader : string;
  selectedLineType : number;
  isEnabledSubmit : boolean = false;
  isEnabledSubmit1 : boolean = false;

  constructor(private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
    this.isEnabledSubmit = false;
    this.isEnabledSubmit1 = false;
  }

  onSubmit(lineNumber : string, dayType:number){
    if(lineNumber != "-- Please select --")
    {
      this.scheduleService.getScheduleForLine(lineNumber,dayType).subscribe(data => {
        this.schedules = data;
        this.scheduleTableHeader = `Line number ${lineNumber}`;
      });
    }
  }

  onOptionSelected(event){
    if(event.target.value != "-- Please select --")
    {
      this.isEnabledSubmit1 = true;
      let lineType = event.target.value;
      this.selectedLineType = lineType;

      this.scheduleService.getLinesByType(lineType).subscribe(data => {      
        this.lines = data;
        this.isEnabledSubmit = false;
      });
    }
    else{
      this.isEnabledSubmit1 = false;
      this.isEnabledSubmit = false;
      this.lines = [];
    }
 }

 onLineSelected(event){
  if(event.target.value != "-- Please select --")
  {
    this.isEnabledSubmit = true;
  }
  else{
    this.isEnabledSubmit = false;
  }
 }
}
