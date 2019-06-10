import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LineServiceService } from 'src/app/Services/line-service.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})
export class AddLineComponent implements OnInit {
  addLineForm = this.fb.group({
    Number : ['', Validators.required],
    LineType : ['', Validators.required]
  });
  constructor(private fb : FormBuilder, private lineService : LineServiceService) { }

  ngOnInit() {
  }

  //TODO dodaj biranje stanica
  onSubmit(){
    this.lineService.addNewLine(this.addLineForm.value).subscribe(
      data =>{
        console.log(data);
    });
  }
}
