import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from 'src/app/Services/tickets-service.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  loggedIn : boolean = false;
  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
    let username = localStorage.getItem('username');
    
    if(username != 'undefined')
    {
      this.loggedIn = true;
    }else{     
      this.loggedIn = false;
    }
  }
  onSubmit(email : string){
    //posalji kartu na email za neregistrovanog korisnika
    this.ticketService.buyTicket(email);
  }
  buyTicket(ticketType : number){
    //karta za ulogovanog
    this.ticketService.buyTicketVerifiedUser(ticketType);
  }
}
