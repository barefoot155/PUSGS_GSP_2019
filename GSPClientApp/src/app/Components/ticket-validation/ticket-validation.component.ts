import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from 'src/app/Services/tickets-service.service';

@Component({
  selector: 'app-ticket-validation',
  templateUrl: './ticket-validation.component.html',
  styleUrls: ['./ticket-validation.component.css']
})
export class TicketValidationComponent implements OnInit {
  valid : boolean = false;
  clicked : boolean = false;
  unknownTicketId : boolean = false;

  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
  }

  isValid(ticketId : number){
    this.unknownTicketId = false;
    this.clicked = true;
    
    this.ticketService.checkTicketId(ticketId).subscribe(
      data => 
      {
        if(data){
          this.ticketService.validateTicket(ticketId).subscribe(
            data =>
            {
              this.valid = data;
            }
          );
        }else{
          this.unknownTicketId = true;
        }
      }
    );
    
  }
}
