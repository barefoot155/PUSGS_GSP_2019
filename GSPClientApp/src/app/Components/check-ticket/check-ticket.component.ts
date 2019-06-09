import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from 'src/app/Services/tickets-service.service';
import { TicketType } from 'src/app/Models/ticketType';
import { TicketModel } from 'src/app/Models/ticketModel';

@Component({
  selector: 'app-check-ticket',
  templateUrl: './check-ticket.component.html',
  styleUrls: ['./check-ticket.component.css']
})
export class CheckTicketComponent implements OnInit {

  ticket : TicketModel;
  valid : boolean = false;

  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
    this.valid = false;
    this.ticketService.getUsersTicket().subscribe(
      data=>
      {
        this.ticket = data;
      });
  }
  
  ticketTypeToString(ticketType : TicketType) : string{
    return TicketType[ticketType];
  }

  validationToString():string{
    this.ticketService.validateTicket(this.ticket.TicketId).subscribe(
      data => {
        this.valid = data;
      });
    return this.valid ? "Valid ticket" : "Ticket expired";
  }
}
