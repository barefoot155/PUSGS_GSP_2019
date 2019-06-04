import { Component, OnInit } from '@angular/core';
import { PricelistServiceService } from 'src/app/Services/pricelist-service.service';
import { PricelistModel } from 'src/app/Models/pricelistModel';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  price : string;

  constructor(private pricelistService: PricelistServiceService) { }

  ngOnInit() {
  }

  onSubmit(ticketType : number){
    this.pricelistService.getPrice(ticketType).subscribe(data => {
      console.log(data);
      this.price = data;
    });
  }
}
