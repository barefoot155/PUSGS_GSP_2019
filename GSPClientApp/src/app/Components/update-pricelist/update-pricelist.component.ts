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

  constructor(private pricelistService: PricelistServiceService) { }

  ngOnInit() {
    this.pricelistService.getActivePricelist().subscribe(
      data=>{
          this.activePricelist = data;
    });
  }
  onChange(event){
    this.isChanged = true;
  }

  updatePricelist(){
    console.log(this.activePricelist);
    this.pricelistService.updatePricelist(this.activePricelist).subscribe(
      result => console.log('Pricelist successfully updated'),
      error => console.log('Error!')
    );
  }

}
