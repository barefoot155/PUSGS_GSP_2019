import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PricelistServiceService } from 'src/app/Services/pricelist-service.service';
import { AddPricelistModel } from 'src/app/Models/addPricelistModel';
import { AddPricelistItemModel } from 'src/app/Models/addPricelistItemModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {
  addPricelistForm = this.fb.group({
    StartDate : ['', [Validators.required, Validators.pattern]],
    EndDate : ['', [Validators.required, Validators.pattern]]
  });

  addPricelistItemForm = this.fb.group({
    HourlyPrice : ['', [Validators.required, Validators.pattern]],
    DailyPrice : ['', [Validators.required, Validators.pattern]],
    MonthlyPrice : ['', [Validators.required, Validators.pattern]],
    AnnualPrice : ['', [Validators.required, Validators.pattern]]
  });

  pricelistId : number = 0;
  pricelistAdded : boolean = false;

  constructor(private fb : FormBuilder, private pricelistService: PricelistServiceService, private router:Router) { }

  ngOnInit() {
  }

  addPricelist(){
    this.pricelistService.addPricelist(this.addPricelistForm.value as AddPricelistModel).subscribe(data =>
      { 
        this.pricelistId = data;
        this.pricelistAdded = true;
      });
  }

  addPricelistItem(){
    //PricelistItem
    this.pricelistService.addPricelistItem(this.addPricelistItemForm.value as AddPricelistItemModel).subscribe(data =>
      { 
        console.log(data);
        this.router.navigate(['']);
      });
  }
}
