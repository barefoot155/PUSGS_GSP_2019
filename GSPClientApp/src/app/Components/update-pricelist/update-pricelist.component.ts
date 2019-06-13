import { Component, OnInit } from '@angular/core';
import { ActivePricelistModel } from 'src/app/Models/activePricelistModel';
import { PricelistServiceService } from 'src/app/Services/pricelist-service.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-update-pricelist',
  templateUrl: './update-pricelist.component.html',
  styleUrls: ['./update-pricelist.component.css']
})
export class UpdatePricelistComponent implements OnInit {
  activePricelist : ActivePricelistModel;
  isChanged : boolean = false;
  dateRegExp = new RegExp('^(0[1-9]|1[0-2])\\.(0[1-9]|1\\d|2\\d|3[01])\\.((19|20)\\d{2})\\.$');
  decnumberRegExc = new RegExp('^\\d+');
  message: string = "";

  constructor(private pricelistService: PricelistServiceService) { }

  ngOnInit() {
    this.message = "";
    this.pricelistService.getActivePricelist().subscribe(
      data=>{
          this.activePricelist = data;
    });
  }
  onChange(event){
    this.isChanged = true;
  }

  updatePricelist(){
    if(this.validate()){
      this.pricelistService.updatePricelist(this.activePricelist).subscribe(
        result => this.message = 'Pricelist successfully updated',
        error => this.message = 'Error updating pricelist!'
      );
    }
    else
    {
      this.message = "Unsupported values for current form."
    }
  }

  validate(){
    if(this.dateRegExp.test(this.activePricelist.StartDate) && this.dateRegExp.test(this.activePricelist.EndDate)
      && this.decnumberRegExc.test(this.activePricelist.DailyPrice.toString())
      && this.decnumberRegExc.test(this.activePricelist.HourlyPrice.toString()) && this.decnumberRegExc.test(this.activePricelist.MonthlyPrice.toString())
      && this.decnumberRegExc.test(this.activePricelist.AnnualPrice.toString()))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
