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
  
  schedules : ScheduleModel[];
  lines : string[];
  scheduleTableHeader : string;
  selectedLineType : number;
  constructor(private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
  }

  onSubmit(lineId : string){

    this.scheduleService.getScheduleForLine(lineId).subscribe(data => {
      console.log(data);
      this.schedules = data;
      this.scheduleTableHeader = `Line number ${lineId}`;
    });
  }

  onOptionSelected(event){
    let lineType = event.target.value;
    this.selectedLineType = lineType;
    console.log(lineType);

    this.scheduleService.getLinesByType(lineType).subscribe(data => {      
      this.lines = data;
    });
 }
}
