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

  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
    this.ticketService.getUsersTicket().subscribe(
      data=>
      {
        this.ticket = data;
      });
  }

  onSubmit(){
    this.ticketService.checkTicket(this.ticket.TicketId).subscribe(
      data => {
        if(data)
        {
          console.log('cekirano');
        }else{
          console.log('ne moze se cekirati');
        }
      });
  }

  ticketTypeToString(ticketType : TicketType) : string{
    return TicketType[ticketType];
  }

  ticketStatusToString(ticketStatus : boolean):string{
    if(ticketStatus)
    {
      return "Checked";
    }
    return "Not checked";    
  }
}
