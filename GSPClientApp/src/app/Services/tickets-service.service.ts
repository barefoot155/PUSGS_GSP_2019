import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsServiceService extends HttpService{
  specificUrl = this.url;
  
  buyTicketUnregistered(email : string):Observable<any>{
    //kupovina za neregistrovanog 
    return this.http.post<any>(this.specificUrl + `api/Ticket/BuyTicketUnregistered?email=${email}`,null);
  }
  buyTicketVerifiedUser(ticketType : number):Observable<any>{
    //kupovina za registrovanog (TODO: dodati jos da li je verifikofan)
    let username = localStorage.getItem('username');
    return this.http.post<any>(this.specificUrl + `api/Ticket/BuyTicketVerified?ticketType=${ticketType}+&username=${username}`,null);
  }
  validateTicket(ticketId : number):Observable<any>{
    return this.http.get<any>(this.url + `api/Ticket/ValidateTicket?ticketId=${ticketId}`);
  }
  checkTicketId(ticketId : number):Observable<any>{
    return this.http.get<any>(this.url + `api/Ticket/CheckTicketId?ticketId=${ticketId}`);
  }
  getUsersTicket():Observable<any>{
    let username = localStorage.getItem('username');
    return this.http.get<any>(this.url + `api/Ticket/GetUsersTicket?username=${username}`);
  }
}
