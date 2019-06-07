import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs';
import { PricelistModel } from 'src/app/Models/pricelistModel';
import { AddPricelistModel } from 'src/app/Models/addPricelistModel';
import { AddPricelistItemModel } from 'src/app/Models/addPricelistItemModel';
import { ActivePricelistModel } from 'src/app/Models/activePricelistModel';

@Injectable({
  providedIn: 'root'
})
export class PricelistServiceService extends HttpService {
  
    specificUrl = this.url + "api/Pricelist/GetPricelist";

    getPrice(ticketType : number) : Observable<any>{      
      return this.http.get<any>(this.specificUrl + `?TicketType=${ticketType}`);
    }

    addPricelist(pricelist : AddPricelistModel):Observable<any>{
      let httpOptions = {
        headers:{
          "Content-type":"application/json"
        }
      }
      return this.http.post<any>(this.url+"api/Pricelist/AddNewPricelist",pricelist,httpOptions);
    }

    addPricelistItem(pricelistItem : AddPricelistItemModel):Observable<any>{
      let httpOptions = {
        headers:{
          "Content-type":"application/json"
        }
      }
      return this.http.post<any>(this.url+"api/PricelistItem/AddNewPricelistItem",pricelistItem,httpOptions);
    }

    getActivePricelist():Observable<any>{
      return this.http.get<any>(this.url+"api/PricelistItem/GetActivePricelist");
    }

    updatePricelist(pricelist : ActivePricelistModel):Observable<any>{
      let httpOptions = {
        headers:{
          "Content-type":"application/json"
        }
      }
      return this.http.post<any>(this.url+"api/PricelistItem/UpdatePricelist",pricelist,httpOptions);
    }
}
