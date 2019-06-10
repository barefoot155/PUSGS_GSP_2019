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
    Lat : [''],
    Lon : ['']
  });
  constructor(private fb : FormBuilder, private stationService : StationServiceService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.stationService.addNewStation(this.addStationForm.value).subscribe(
      data => {
          console.log(data);
    });
  }
}
