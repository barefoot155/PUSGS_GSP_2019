import { Component, OnInit } from '@angular/core';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CheckboxModel } from 'src/app/Models/checkboxModel';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  formTimes: FormGroup;
  times = [];
  
  options : string[];
  currentTimes : CheckboxModel[] = [];
  newTimes : string[];
  
  addScheduleForm = this.fb.group({
    LineNumber : ['', Validators.required],
    DayType : ['', Validators.required]
  });
  
  constructor(private scheduleService : ScheduleServiceService, private fb : FormBuilder) {
    this.formTimes = this.fb.group({
        times: new FormArray([]) 
    });
    this.addCheckboxes();
   }
   private addCheckboxes() {
    this.times.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.formTimes.controls.orders as FormArray).push(control);
    });
  }
  ngOnInit() {
    this.scheduleService.getAllLines().subscribe(
      data =>{
        this.options = data;
      });
  }
  onSubmit(){
    this.scheduleService.getScheduleForLine(this.addScheduleForm.value.LineNumber,this.addScheduleForm.value.DayType).subscribe(
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
    
  }
}
