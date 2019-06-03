import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleForm = this.fb.group({
    LineId : ['']
  });
  constructor(private scheduleService : ScheduleServiceService, private fb : FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
    let lineId = "1"; //event.target.lineId.value;

    this.scheduleService.getScheduleForLine(lineId).subscribe(data => {
      console.log(data);
    });
  }
}
