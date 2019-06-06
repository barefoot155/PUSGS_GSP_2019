import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsServiceService extends HttpService{
  specificUrlSch = this.url + "api/Ticket/BuyTicket";
  
  buyTicket(email : string){
    //kupovina za neregistrovanog 
    
    //return this.http.get<ScheduleModel[]>(this.specificUrlSch + `?lineNumber=${lineId}&dayType=${dayType}`);
  }
  buyTicketVerifiedUser(ticketType : number){
    //kupovina za registrovanog 
    //uzeti iz localstorage username i poslati na back

    //return this.http.get<ScheduleModel[]>(this.specificUrlSch + `?lineNumber=${lineId}&dayType=${dayType}`);
  }
}
