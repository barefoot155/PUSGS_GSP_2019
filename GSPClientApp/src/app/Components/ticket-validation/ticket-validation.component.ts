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
  message: string = "";
  ticketId : number;

  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
    this.message = "";
  }

  isValid(){
    // this.unknownTicketId = false;
    // this.clicked = true;
    
    this.ticketService.checkTicketId(this.ticketId).subscribe(
      data => 
      {
        if(!data){
          this.ticketService.validateTicket(this.ticketId).subscribe(
            data =>
            {
              this.message = data;
            }
          );
        }else{
          this.message = data;
        }
      }
    );
    
  }
}
