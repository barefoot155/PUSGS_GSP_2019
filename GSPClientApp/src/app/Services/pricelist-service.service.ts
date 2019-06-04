import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { PricelistModel } from 'src/app/Models/pricelistModel';

@Injectable({
  providedIn: 'root'
})
export class PricelistServiceService extends HttpService {
  
    specificUrl = this.url + "api/Pricelist/GetPricelist";

    getPrice(ticketType : number) : Observable<any>{      
      return this.http.get<any>(this.specificUrl + `?TicketType=${ticketType}`);
    }
}
