import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StationServiceService } from 'src/app/Services/station-service.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit {
  addStationForm = this.fb.group({
    Name : ['', Validators.required],
    Address : ['', Validators.required],
    Lat : ['', [Validators.required, Validators.pattern]],
    Lon : ['', [Validators.required, Validators.pattern]]
  });

  message : string = "";
  constructor(private fb : FormBuilder, private stationService : StationServiceService) { }

  ngOnInit() {
    this.message = "";
  }

  onSubmit(){
    this.stationService.addNewStation(this.addStationForm.value).subscribe(
      data => {
          this.message = data;
    });
  }
}
