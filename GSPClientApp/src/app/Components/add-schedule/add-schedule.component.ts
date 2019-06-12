import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CheckboxModel } from 'src/app/Models/checkboxModel';
import { AddScheduleModel } from 'src/app/Models/addSchedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  
  options : string[];
  currentTimes : CheckboxModel[] = [];
  newTimesChecked : string[];
  newSchedule : AddScheduleModel;

  selectedNumber : string;
  selectedDay : number;
  
  constructor(private scheduleService : ScheduleServiceService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
   
  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data =>{
        this.options = data;
      });
  }
  onSubmit(){
    this.scheduleService.getScheduleForLine(this.selectedNumber,this.selectedDay).subscribe(
      data=>{
        for(var i=0; i<data.length; i++){
          this.currentTimes.push({value : data[i], isChecked: true})
        }
    });
  }
  AddTimes(newTimes : string){
    console.log(newTimes);
    let checkedTimes = this.currentTimes.filter((ch) => { return ch.isChecked }).map((ch) => { return ch.value });
    console.log(checkedTimes);    

    this.newSchedule = new AddScheduleModel();

    this.newSchedule.Number = this.selectedNumber;
    this.newSchedule.DayType = this.selectedDay;
    this.newSchedule.NewTimes = newTimes;
    this.newSchedule.CheckedTimes = checkedTimes;

    this.scheduleService.addNewSchedule(this.newSchedule).subscribe(
      data => {
        console.log('added')
    });
  }

  onSelectionChangeNumber(event){
    this.selectedNumber = event.target.value;
    if(this.selectedNumber && this.selectedDay)
    {
      this.onSubmit();
    }
  }

  onSelectionChangeDay(event){
    this.selectedDay = event.target.value;
    if(this.selectedNumber && this.selectedDay)
    {
      this.onSubmit();
    }
  }

  removeSchedule(){
    this.scheduleService.removeSchedule(this.selectedNumber, this.selectedDay).subscribe(
      data =>{ 
        console.log(data);
        this.router.navigate(['/addschedule']);
      }
    );
  }
}
