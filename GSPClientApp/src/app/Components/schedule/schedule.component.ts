import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  
  constructor(private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
  }

  onSubmit(lineId : string){

    this.scheduleService.getScheduleForLine(lineId).subscribe(data => {
      console.log(data);
    });
  }
}
