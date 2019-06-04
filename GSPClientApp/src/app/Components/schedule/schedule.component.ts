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
  scheduleTableHeader : string;
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
}
