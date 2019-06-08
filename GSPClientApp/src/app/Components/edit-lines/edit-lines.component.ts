import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {

  lines : string[];

  constructor(private scheduleService : ScheduleServiceService) { }

  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data => this.lines = data
    );
  }

}
